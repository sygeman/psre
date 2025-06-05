import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

// WebSocket подключение для всех операций (queries, mutations, subscriptions)
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:5000/graphql',
    //   connectionParams: () => {
    //     // Note: getSession() is a placeholder function created by you
    //     const session = getSession();
    //     if (!session) {
    //       return {};
    //     }
    //     return {
    //       Authorization: `Bearer ${session.token}`,
    //     };
    //   },
  }),
)

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: wsLink,
  cache,
})