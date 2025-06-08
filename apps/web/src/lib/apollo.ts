import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export const apolloClient = new ApolloClient({
    link: new GraphQLWsLink(createClient({
      url: 'http://localhost:5000/graphql',
      connectionParams: {
        sessionId: 'fdb410ef-4558-4090-a382-ccca27f01215'
      }
    })),
    cache: new InMemoryCache()
  })

export { gql } from '@apollo/client/core'