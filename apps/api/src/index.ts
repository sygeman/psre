import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { createYoga } from "graphql-yoga";
import { pubsub, inngest, directus, db, seed, dbSeed } from "@psre/tools";
import { serve } from "inngest/bun";
import { schema } from "./schema";
import { inngestFunctions } from "@psre/chat/api";

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
    const accountQuery = await directus.query(
      CURRENT_ACCOUNT_ID_BY_TOKEN_QUERY,
      { psreAuthTokensByIdId: token },
    );
    return accountQuery?.psre_auth_tokens_by_id?.user?.current_account?.id;
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
  fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/inngest") {
      return serve({ client: inngest, functions: [...inngestFunctions] })(
        request,
      );
    }

    return new Response("Not found", { status: 404 });
  },
});

await dbSeed()
