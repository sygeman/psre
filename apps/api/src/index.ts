import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { createYoga } from "graphql-yoga";
import { serve } from "inngest/bun";
import { AuthDataValidator } from "@telegram-auth/server";
import { users as usersTable } from './db/schema/users'
import { accounts as accountsTable } from './db/schema/accounts'
import { schema } from "./schema";
import { inngestFunctions } from "./modules/chat";
import { inngest } from "./lib/inngest";
import { db, dbSeed } from "./db";
import { pubsub } from "./lib/pubsub";
import { eq } from "drizzle-orm";

type ConnectionParams = {
  token?: string;
};

type Extra = {
  accountId?: string;
};

const gql = String.raw;

const CURRENT_ACCOUNT_ID_BY_TOKEN_QUERY = gql`
  query CurrentAccountIdByToken($psreAuthTokensByIdId: ID!) {
    psre_auth_tokens_by_id(id: $psreAuthTokensByIdId) {
      user {
        current_account {
          id
        }
      }
    }
  }
`;

const currentAccountIdByToken = async (token?: string) => {
  if (!token) return false;

  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => (eq(users.token, token))
    })

    return user?.currentAccountId?.toString() || false;
  } catch {
    return false;
  }
};

const yogaApp = createYoga<{ extra: Extra }>({
  schema,
  context: (ctx) => {
    return { pubsub, currentAccountId: ctx.extra.accountId };
  },
  graphiql: { subscriptionsProtocol: "WS" },
});

// Get NodeJS Server from Yoga
const httpServer = createServer(yogaApp);

// Create WebSocket server instance from our Node server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: yogaApp.graphqlEndpoint,
});

// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer<ConnectionParams, Extra>(
  {
    execute: (args: any) => args.rootValue.execute(args),
    subscribe: (args: any) => args.rootValue.subscribe(args),
    onConnect: async (ctx) => {
      // do your auth check on every connect (recommended)
      const accountId = await currentAccountIdByToken(
        ctx.connectionParams?.token,
      );

      console.log('accountId', accountId)

      // returning false from the onConnect callback will close with `4403: Forbidden`;
      // therefore, being synonymous to ctx.extra.socket.close(4403, 'Forbidden');
      if (!accountId) return false;

      ctx.extra.accountId = accountId;
    },
    onSubscribe: async (ctx, _id, params) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yogaApp.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params,
        });

      const args = {
        schema,
        operationName: params.operationName,
        document: parse(params.query),
        variableValues: params.variables,
        contextValue: await contextFactory(),
        rootValue: { execute, subscribe },
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer,
);

const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});

Bun.serve({
  port: 4500,
  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/login") {
      const { data } = await request.json();

      // Validate telegram data
      const botToken = process.env.TELEGRAM_BOT_TOKEN!;
      const validator = new AuthDataValidator({ botToken });
      const userTgData = await validator.validate(new Map(Object.entries(data)));
      const telegramId = userTgData.id.toString()

      // console.log(user);
      // Find user
      let userFromDb = await db.query.users.findFirst({
        where: (users, { eq }) => (eq(users.telegramId, telegramId))
      })

      // Create user if not exist
      if (!userFromDb) {
        // Create user
        const users = await db.insert(usersTable).values({ telegramId }).returning();
        userFromDb = users[0];

        if (!userFromDb) return new Response('User not found', { status: 404 });;

        const accounts = await db.insert(accountsTable).values({
          userId: userFromDb.id,
          name: crypto.randomUUID().toString()
        }).returning();

        const account = accounts[0]

        if (!account) return new Response('Account not found', { status: 404 });;

        await db.update(usersTable)
          .set({ currentAccountId: account.id })
          .where(eq(accountsTable.id, account.id))
          .from(accountsTable)
      }

      // Generate auth token
      const token = crypto.randomUUID()
      await db.update(usersTable)
        .set({ token })
        .where(eq(usersTable.id, userFromDb.id))

      return new Response(token, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS, POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }

    if (url.pathname === "/api/inngest") {
      return serve({ client: inngest, functions: [...inngestFunctions] })(
        request,
      );
    }

    return new Response("Not found", { status: 404 });
  },
});

// await dbSeed()
