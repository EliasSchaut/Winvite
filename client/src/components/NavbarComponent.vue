<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Winvite</router-link>
      <button
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler"
        data-bs-target="#navbarSupportedContent"
        data-bs-toggle="collapse"
        type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">{{ $t('nav.home') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/details">{{ $t('nav.details') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/guests">{{ $t('nav.guests') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/shifts">{{ $t('nav.shiftings') }}</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/privacy">{{ $t('nav.privacy') }}</router-link>
          </li>
          <li>
            <a class="nav-link" href="https://github.com/EliasSchaut/Winvite" target="_blank"
              >GitHub</a
            >
          </li>
        </ul>

        <div class="d-flex justify-content-end">
          <div class="me-lg-1 spinner-border text-secondary" role="status" v-if="store.loading">
            <span class="visually-hidden">Loading...</span>
          </div>

          <div class="dropdown align-self-center">
            <button
              aria-expanded="false"
              class="btn dropdown-toggle border-0 d-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <img
                v-if="store.theme === 'dark'"
                alt="Theme Dark"
                src="../assets/svg/moon-stars-fill-white.svg"
              />
              <img
                v-else-if="store.theme === 'auto' && store.theme_without_auto === 'dark'"
                alt="Theme Auto"
                src="../assets/svg/circle-half-white.svg"
              />
              <img
                v-else-if="store.theme === 'auto' && store.theme_without_auto !== 'dark'"
                alt="Theme Auto"
                src="../assets/svg/circle-half.svg"
              />
              <img v-else alt="Theme Light" src="../assets/svg/brightness-high-fill.svg" />
            </button>
            <ul class="dropdown-menu">
              <li v-if="store.theme_without_auto === 'dark'">
                <button
                  class="dropdown-item d-flex align-items-center"
                  @click="store.update_theme('light')"
                >
                  <img
                    alt="Theme Light"
                    src="../assets/svg/brightness-high-fill-white.svg"
                  />&nbsp;&nbsp;{{ $t('common.theme.light') }}
                </button>
              </li>
              <li v-if="store.theme_without_auto === 'dark'">
                <button
                  class="dropdown-item d-flex align-items-center"
                  @click="store.update_theme('dark')"
                >
                  <img
                    alt="Theme Dark"
                    src="../assets/svg/moon-stars-fill-white.svg"
                  />&nbsp;&nbsp;{{ $t('common.theme.dark') }}
                </button>
              </li>
              <li v-if="store.theme_without_auto === 'dark'">
                <button
                  class="dropdown-item d-flex align-items-center"
                  @click="store.update_theme('auto')"
                >
                  <img alt="Theme Auto" src="../assets/svg/circle-half-white.svg" />&nbsp;&nbsp;{{
                    $t('common.theme.auto')
                  }}
                </button>
              </li>
              <li v-if="store.theme_without_auto !== 'dark'">
                <button
                  class="dropdown-item d-flex align-items-center"
                  @click="store.update_theme('light')"
                >
                  <img
                    alt="Theme Light"
                    src="../assets/svg/brightness-high-fill.svg"
                  />&nbsp;&nbsp;{{ $t('common.theme.light') }}
                </button>
              </li>
              <li v-if="store.theme_without_auto !== 'dark'">
                <button
                  class="dropdown-item d-flex align-items-center"
                  @click="store.update_theme('dark')"
                >
                  <img alt="Theme Dark" src="../assets/svg/moon-stars-fill.svg" />&nbsp;&nbsp;{{
                    $t('common.theme.dark')
                  }}
                </button>
              </li>
              <li v-if="store.theme_without_auto !== 'dark'">
                <button
                  class="dropdown-item d-flex align-items-center"
                  @click="store.update_theme('auto')"
                >
                  <img alt="Theme Auto" src="../assets/svg/circle-half.svg" />&nbsp;&nbsp;{{
                    $t('common.theme.auto')
                  }}
                </button>
              </li>
            </ul>
          </div>
          <select
            style="max-width: 132px"
            v-model="$i18n.locale"
            aria-label="Select Lang"
            class="form-select"
            @change="change_lang"
          >
            <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">
              {{ $t(`nav.lang.${locale}`) }}
            </option>
          </select>
          <router-link
            v-if="store.logged_in"
            class="btn btn-outline-primary"
            to="/profile"
            type="button"
          >
            {{ $t('nav.profile') }}
          </router-link>
          <router-link v-if="store.logged_in" class="btn btn-danger" to="/logout" type="button"
            >{{ $t('nav.logout') }}
          </router-link>
          <router-link v-if="!store.logged_in" class="btn btn-success" to="/join" type="button"
            >{{ $t('nav.join') }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { store } from '@/util/store'
import dayjs from 'dayjs'
import 'dayjs/locale/de'
import 'dayjs/locale/en'

export default defineComponent({
  name: 'NavbarComponent',
  data() {
    return {
      lang: ref(this.$i18n.locale || 'en')
    }
  },
  setup() {
    return {
      store
    }
  },
  methods: {
    change_lang: function (event: any) {
      const new_lang = event.target.value as 'en' | 'de'
      this.store.hide_alert()
      dayjs.locale(new_lang)
      localStorage.setItem('lang', new_lang)
      this.$i18n.locale = new_lang
    }
  }
})
</script>

<style scoped>
.btn {
  margin-left: 10px;
}
</style>
