import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

export const apolloClient = new ApolloClient({
  link: new GraphQLWsLink(
    createClient({
      url: 'http://localhost:4000/graphql',
    })
  ),
  cache: new InMemoryCache(),
});

export { gql } from '@apollo/client/core';
