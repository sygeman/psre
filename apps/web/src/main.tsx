import { Router, Route } from '@solidjs/router';
import { createEffect, onMount } from 'solid-js';
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
import { ArmoryPage } from '@/pages/armory';
import MiniGames from '@/pages/mini-games';
import SlotsPage from '@/pages/slots';
import { initializeApp } from '@/helpers/initialize-app';
import { apolloClient, gql } from '@/lib/apollo';

export const Main = () => {
  onMount(() => {
    initializeApp();
  });

  apolloClient.query({
    query: gql`
      query GetChatMessages($chatId: String!) {
        chatMessages(chatId: $chatId) {
          id
          content
          userId
          userName
          chatId
          createdAt
        }
      }
    `,
    variables: {
      chatId: '1'
    }
  }).then((data) => {
    console.log(data?.data?.chatMessages);
  });

  return (
    <Router>
      {/* <ConnectionOverlay /> */}
      <Route path="/" component={HomePage} />
      <Route path="/armory" component={ArmoryPage} />
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
      <Route path="/mini-games">
        <Route path="/" component={MiniGames} />
        <Route path="/slots" component={SlotsPage} />
      </Route>
    </Router>
  );
};