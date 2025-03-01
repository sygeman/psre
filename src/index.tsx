import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";

import { HomePage } from "./pages/home";
import { Layout } from "./layout";
import { RegionPage } from "./pages/region";
import { directus } from "./lib/directus";

await directus.connect()

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={HomePage} />
      <Route path="/region" component={RegionPage} />
    </Router>
  ),
  document.getElementById("root")
);
