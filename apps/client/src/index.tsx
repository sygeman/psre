import { ApolloProvider } from "@psre/apollo";
import { render } from "solid-js/web";
import "./index.css";

import { Main } from "./main";

import { apolloClient } from "./lib/apollo";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Main />
    </ApolloProvider>
  );
};

render(() => <App />, document.getElementById("root"));
