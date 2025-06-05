import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

// WebSocket подключение для всех операций (queries, mutations, subscriptions)
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'http://localhost:5000/graphql',
  }),
)

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: wsLink,
  cache,
})