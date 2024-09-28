import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";

import { IndexPage } from "./pages/index";

render(
  () => (
    <Router>
      <Route path="/" component={IndexPage} />
    </Router>
  ),
  document.getElementById("root")
);
