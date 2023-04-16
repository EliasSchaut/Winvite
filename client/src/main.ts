import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, provide, h } from "vue";
import App from './App.vue';
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import router from '@/router/router';

import '@/plugins/bootstrap';
import '@/assets/css/main.css';

import en from '@/locales/en.json';
import de from '@/locales/de.json';
import { get_cookie } from "@/util/cookie";

// ------------
// Apollo setup
// ------------
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})
const cache = new InMemoryCache()
const apollo_client = new ApolloClient({
  link: httpLink,
  cache,
})
// ------------

i18next.init({
  lng: get_cookie("lang") || "en",
  resources: {
    en: { translation: en },
    de: { translation: de },
  }
}).then(() => {
  const app = createApp({
    setup() {
      provide(DefaultApolloClient, apollo_client)
    },
    render: () => h(App)
  })
  app.use(I18NextVue, { i18next })
  app.use(router)
  app.mount('#app')
});
