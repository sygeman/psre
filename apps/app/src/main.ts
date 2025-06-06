import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './lib/apollo'
import router from './router'

const app = createApp(App)
app.use(router)

app.provide(DefaultApolloClient, apolloClient)
app.mount('#app')
