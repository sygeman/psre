import { makeExecutableSchema } from "@graphql-tools/schema";
import { pubsub } from "./pubsub";

export const typeDefs = `#graphql
  scalar DateTime

  type ChatMessage {
    id: ID!
    content: String!
    accountId: String!
    chatId: String!
    createdAt: DateTime!
  }

  type Query {
    chatMessages(chatId: String!): [ChatMessage!]!
  }

  type Mutation {
    createChatMessage(input: SendMessageInput!): Boolean!
  }

  input SendMessageInput {
    chatId: String!
    content: String!
  }

  type Subscription {
    createdChatMessage(chatId: String!): ChatMessage!
  }
`;

export const resolvers = {
  Query: {
    chatMessages: () => [],
  },
  Mutation: {
    createChatMessage: () => true
  },
  Subscription: {
    createdChatMessage: {
      subscribe: () => pubsub.asyncIterator('createdChatMessage'),
    },
  },
};

// setInterval(() => {
//   pubsub.publish('createdChatMessage', {
//     createdChatMessage: {
//       id: crypto.randomUUID(),
//       content: '123',
//       accountId: crypto.randomUUID(),
//       chatId: '1',
//       createdAt: new Date(),
//     },
// });
// }, 4000)

export const schema = makeExecutableSchema({ typeDefs, resolvers });