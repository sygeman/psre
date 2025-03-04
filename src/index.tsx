import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import './index.css';

import { HomePage } from '@/pages/home';
import { RegionPage } from '@/pages/region';
import { HeroesPage } from '@/pages/heroes';
import { VipPage } from '@/pages/vip';
import { ShopPage } from '@/pages/shop';
import { PersonPage } from '@/pages/person';
import ChatPage from '@/pages/chat';
import { RankPage } from '@/pages/rank';
import { QuestsPage } from '@/pages/quests';
import { AlliancePage } from '@/pages/alliance';
import { MailPage } from '@/pages/mail';
import { ConnectionOverlay } from '@/components/connection-overlay';
import { initializeAllStores } from '@/stores/init';
import { connectionStore } from '@/stores/connection';

await initializeAllStores();

render(
  () => (
    <>
      <ConnectionOverlay isConnected={connectionStore.isConnected()} />
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/region" component={RegionPage} />
        <Route path="/heroes" component={HeroesPage} />
        <Route path="/mail" component={MailPage} />
        <Route path="/vip" component={VipPage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/person" component={PersonPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/rank" component={RankPage} />
        <Route path="/quests" component={QuestsPage} />
        <Route path="/alliance" component={AlliancePage} />
      </Router>
    </>
  ),
  document.getElementById('root')
);
