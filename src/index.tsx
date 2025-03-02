import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import './index.css';

import { HomePage } from './pages/home';
import { Layout } from './layout';
import { RegionPage } from './pages/region';
import { directus } from './lib/directus';
import { initializeStore } from './stores/state';
import { HeroesPage } from './pages/heroes';
import { VipPage } from './pages/vip';
import { ShopPage } from './pages/shop';

await directus.connect();
initializeStore();

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={HomePage} />
      <Route path="/region" component={RegionPage} />
      <Route path="/heroes" component={HeroesPage} />
      <Route path="/vip" component={VipPage} />
      <Route path="/shop" component={ShopPage} />
    </Router>
  ),
  document.getElementById('root')
);
