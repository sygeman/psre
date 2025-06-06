import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConnectionTestView from '../views/ConnectionTestView.vue'

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
    // {
    //   path: '/armory',
    //   name: 'armory',
    //   component: ArmoryView,
    // },
    // {
    //   path: '/region',
    //   name: 'region',
    //   component: RegionView,
    // },
    // {
    //   path: '/heroes',
    //   name: 'heroes',
    //   component: HeroesView,
    // },
    // {
    //   path: '/mail',
    //   name: 'mail',
    //   component: MailView,
    // },
    // {
    //   path: '/vip',
    //   name: 'vip',
    //   component: VipView,
    // },
    // {
    //   path: '/shop',
    //   name: 'shop',
    //   component: ShopView,
    // },
    // {
    //   path: '/person',
    //   name: 'person',
    //   component: PersonView,
    // },
    // {
    //   path: '/chat',
    //   name: 'chat',
    //   component: ChatView,
    // },
    // {
    //   path: '/rank',
    //   name: 'rank',
    //   component: RankView,
    // },
    // {
    //   path: '/quests',
    //   name: 'quests',
    //   component: QuestsView,
    // },
    // {
    //   path: '/alliance',
    //   name: 'alliance',
    //   component: AllianceView,
    // },
    // {
    //   path: '/mini-games',
    //   name: 'mini-games',
    //   component: MiniGamesView,
    //   children: [
    //     {
    //       path: '/slots',
    //       component: SlotsView,
    //     },
    //   ],
    // },
  ],
})

export default router
