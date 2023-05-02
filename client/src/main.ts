import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'

import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import de from '@/locales/de.json'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/de'
import 'dayjs/locale/en'

import { createApp, h, provide } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import { store } from '@/util/store'

// ------------
// Plugins setup
// ------------
import '@/plugins/bootstrap'
import '@/assets/css/main.css'
// ------------

// ------------
// Lang setup
// ------------
const default_locale =
  localStorage.getItem('lang') || (navigator.language === 'de-DE' ? 'de' : 'en')
type MessageSchema = typeof en
const i18n = createI18n<[MessageSchema], 'en' | 'de'>({
  locale: default_locale,
  fallbackLocale: 'en',
  messages: {
    en: en,
    de: de
  }
})
export const get_locale: () => string = () => i18n.global.locale as string
dayjs.extend(localizedFormat)
dayjs.locale(get_locale())
// ------------

// ------------
// Apollo setup
// ------------
const httpLink = createHttpLink({
  uri: `${window.location.origin}/graphql`
})
const cache = new InMemoryCache()
const apollo_client = new ApolloClient({
  link: httpLink,
  headers: {
    authorization: localStorage.getItem('barrier_token') || '',
    accept_language: default_locale
  },
  cache
})
// ------------

// ------------
// Vue setup
// ------------
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apollo_client)
    provideApolloClient(apollo_client)
  },
  render: () => h(App)
})
app.use(i18n)
app.use(router)
if (typeof localStorage.getItem('barrier_token') === 'string') store.logged_in = true
app.mount('#app')
// ------------
