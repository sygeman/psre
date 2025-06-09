import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import { createServer } from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import cors from 'cors';
import "reflect-metadata";
import { ChatResolver } from '@psre/chat/api';
import { buildSchema } from 'type-graphql';
import { pubSub } from './pubsub'
import path from 'path';

const schema = await buildSchema({
  resolvers: [ChatResolver],
  emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
  pubSub
});

const app = express();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
const serverCleanup = useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await apolloServer.start();
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(apolloServer),
);

const PORT = 4000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});


setInterval(() => {
  pubSub.publish('createdChatMessage', {
    id: crypto.randomUUID(),
    content: '123',
    accountId: crypto.randomUUID(),
    chatId: '1',
    createdAt: new Date(),
});
}, 4000)