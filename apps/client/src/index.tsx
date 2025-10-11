import { ApolloProvider } from "@/apollo"
import { render } from "solid-js/web"
import { Show } from "solid-js"
import "./index.css"

import { Main } from "./main"

import { apolloClient } from "./apollo/client"
import { LoginPage } from "./pages/login"

const App = () => {
  // If TMA -> POST /api/login -> set token -> show main app
  // If WEB with token -> show main app
  // If WEB without token -> show login -> POST /api/login -> set token -> reload
  // If WEB with invalid token -> remove token -> reload

  // TODO: Need to create loading screen (init tma, login with tma data, validate token)

  const token = localStorage.getItem("token")

  return (
    <>
      <Show when={!token}>
        <LoginPage />
      </Show>
      <Show when={token}>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </Show>
    </>
  )
}

render(() => <App />, document.getElementById("root"))
