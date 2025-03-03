import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import './index.css';

import { HomePage } from './pages/home';
import { RegionPage } from './pages/region';
import { directus } from './lib/directus';
import { initializeStore } from './stores/state';
import { HeroesPage } from './pages/heroes';
import { VipPage } from './pages/vip';
import { ShopPage } from './pages/shop';
import { PersonPage } from './pages/person';
import ChatPage from './pages/chat';
import { chatStore } from './stores/chat';

await directus.connect();
initializeStore();
chatStore.initializeMockMessages();

render(
  () => (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/region" component={RegionPage} />
      <Route path="/heroes" component={HeroesPage} />
      <Route path="/vip" component={VipPage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/person" component={PersonPage} />
      <Route path="/chat" component={ChatPage} />
    </Router>
  ),
  document.getElementById('root')
);
