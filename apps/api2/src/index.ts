import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { createYoga } from "graphql-yoga";
import { pubsub } from "@psre/gql-tools";
import { schema } from "./schema";

const yogaApp = createYoga({
  schema,
  context: () => ({ pubsub }),
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
useServer(
  {
    execute: (args: any) => args.rootValue.execute(args),
    subscribe: (args: any) => args.rootValue.subscribe(args),
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

setInterval(() => {
  pubsub.publish("createdChatMessage", "1", {
    id: crypto.randomUUID(),
    content: "123",
    accountId: crypto.randomUUID(),
    chatId: "1",
    createdAt: new Date(),
  });
}, 4000);
