import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import { createApp, h, provide } from 'vue';
import App from './App.vue';
import router from '@/router/router';

import '@/plugins/bootstrap';
import '@/assets/css/main.css';

import en from '@/locales/en.json';
import de from '@/locales/de.json';
import { createI18n } from 'vue-i18n';

type MessageSchema = typeof en

// ------------
// Apollo setup
// ------------
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
});
const cache = new InMemoryCache();
const apollo_client = new ApolloClient({
  link: httpLink,
  headers: {
    authorization: localStorage.getItem("barrier_token") || "",
    accept_language: localStorage.getItem("lang") || "en",
  },
  cache,
})
// ------------

const i18n = createI18n<[MessageSchema], 'en' | 'de'>({
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'de': de
  }
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apollo_client);
    provideApolloClient(apollo_client);
  },
  render: () => h(App)
});
app.use(i18n);
app.use(router);
app.mount('#app');
