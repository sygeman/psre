import { ApolloClient, InMemoryCache } from "@apollo/client/core"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"

export const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link: new GraphQLWsLink(
    createClient({
      url: "http://localhost:4000/graphql",
      connectionParams: () => ({
        token: localStorage.getItem("token"),
      }),
    }),
  ),
  cache: new InMemoryCache(),
})
