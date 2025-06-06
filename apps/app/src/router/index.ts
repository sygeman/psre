import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConnectionTestView from '../views/ConnectionTestView.vue'
import ArmoryView from '../views/ArmoryView.vue'
import RegionView from '../views/RegionView.vue'
import HeroesView from '../views/HeroesView.vue'
import MailView from '../views/MailView.vue'
import VipView from '../views/VipView.vue'
import ShopView from '../views/ShopView.vue'
import PersonView from '../views/PersonView.vue'
import ChatView from '../views/ChatView.vue'
import RankView from '../views/RankView.vue'
import QuestsView from '../views/QuestsView.vue'
import AllianceView from '../views/AllianceView.vue'
import MiniGamesView from '../views/MiniGamesView.vue'
import SlotsView from '../views/SlotsView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/connection-test',
      name: 'connection-test',
      component: ConnectionTestView,
    },
    {
      path: '/armory',
      name: 'armory',
      component: ArmoryView,
    },
    {
      path: '/region',
      name: 'region',
      component: RegionView,
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: HeroesView,
    },
    {
      path: '/mail',
      name: 'mail',
      component: MailView,
    },
    {
      path: '/vip',
      name: 'vip',
      component: VipView,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/person',
      name: 'person',
      component: PersonView,
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
    },
    {
      path: '/rank',
      name: 'rank',
      component: RankView,
    },
    {
      path: '/quests',
      name: 'quests',
      component: QuestsView,
    },
    {
      path: '/alliance',
      name: 'alliance',
      component: AllianceView,
    },
    {
      path: '/mini-games',
      name: 'mini-games',
      component: MiniGamesView,
    },
    {
      path: '/mini-games/slots',
      name: 'slots',
      component: SlotsView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
})

export default router
