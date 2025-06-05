import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GraphQLExample from '../components/GraphQLExample.vue'
import ShadcnDemo from '../components/ShadcnDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/graphql',
      name: 'graphql',
      component: GraphQLExample,
    },
    {
      path: '/shadcn',
      name: 'shadcn',
      component: ShadcnDemo,
    },
  ],
})

export default router
