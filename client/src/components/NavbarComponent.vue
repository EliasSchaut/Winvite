<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Movie Monday Manager</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">{{ $t("nav.home") }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/details">{{ $t("nav.details") }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/help">{{ $t("nav.shiftings") }}</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/privacy">{{ $t("nav.privacy") }}</router-link>
          </li>
          <li>
            <a class="nav-link" href="https://github.com/EliasSchaut/Winvite" target="_blank">GitHub</a>
          </li>
        </ul>

        <div class="d-flex justify-content-end">
          <div class="me-lg-1 spinner-border text-secondary" role="status" v-if="store.loading">
            <span class="visually-hidden">Loading...</span>
          </div>

          <div class="dropdown align-self-center">
            <button class="btn dropdown-toggle border-0 d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
              <img v-if="store.theme === 'dark'" src="../assets/svg/moon-stars-fill-white.svg" alt="Theme Dark">
              <img v-else-if="store.theme === 'auto' && store.theme_without_auto === 'dark'" src="../assets/svg/circle-half-white.svg" alt="Theme Auto">
              <img v-else-if="store.theme === 'auto' && store.theme_without_auto !== 'dark'" src="../assets/svg/circle-half.svg" alt="Theme Auto">
              <img v-else src="../assets/svg/brightness-high-fill.svg" alt="Theme Light">
            </button>
            <ul class="dropdown-menu">
              <li v-if="store.theme_without_auto === 'dark'" ><button class="dropdown-item d-flex align-items-center" @click="store.update_theme('light')"><img src="../assets/svg/brightness-high-fill-white.svg" alt="Theme Light">&nbsp;&nbsp;{{ $t("common.theme.light") }}</button></li>
              <li v-if="store.theme_without_auto === 'dark'" ><button class="dropdown-item d-flex align-items-center" @click="store.update_theme('dark')"><img src="../assets/svg/moon-stars-fill-white.svg" alt="Theme Dark">&nbsp;&nbsp;{{ $t("common.theme.dark") }}</button></li>
              <li v-if="store.theme_without_auto === 'dark'" ><button class="dropdown-item d-flex align-items-center" @click="store.update_theme('auto')"><img src="../assets/svg/circle-half-white.svg" alt="Theme Auto">&nbsp;&nbsp;{{ $t("common.theme.auto") }}</button></li>
              <li v-if="store.theme_without_auto !== 'dark'"><button class="dropdown-item d-flex align-items-center" @click="store.update_theme('light')"><img src="../assets/svg/brightness-high-fill.svg" alt="Theme Light">&nbsp;&nbsp;{{ $t("common.theme.light") }}</button></li>
              <li v-if="store.theme_without_auto !== 'dark'"><button class="dropdown-item d-flex align-items-center" @click="store.update_theme('dark')"><img src="../assets/svg/moon-stars-fill.svg" alt="Theme Dark">&nbsp;&nbsp;{{ $t("common.theme.dark") }}</button></li>
              <li v-if="store.theme_without_auto !== 'dark'"><button class="dropdown-item d-flex align-items-center" @click="store.update_theme('auto')"><img src="../assets/svg/circle-half.svg" alt="Theme Auto">&nbsp;&nbsp;{{ $t("common.theme.auto") }}</button></li>
            </ul>
          </div>
          <select class="form-select" aria-label="Select Lang" @change="change_lang" v-model="lang">
            <option value="en">{{ $t("nav.lang.en") }}</option>
            <option value="de">{{ $t("nav.lang.de") }}</option>
          </select>
          <router-link class="navbar me-lg-3" to="/guests">{{ $t("nav.guests") }}</router-link>
          <router-link class="btn btn-success" type="button" to="/join">{{ $t("nav.join") }}</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { set_cookie } from "@/util/cookie";
import { store } from "@/util/store";

export default defineComponent({
  name: "NavbarComponent",
  data() {
    return {
      lang: ref(this.$i18next.language || "en"),
    }
  },
  setup() {
    return {
      store,
    }
  },
  methods: {
    change_lang: function (event: any) {
      const new_lang = event.target.value as "en" | "de"
      this.store.hide_alert()
      this.$i18next.changeLanguage(new_lang)
      set_cookie("lang", new_lang, 365)
    }
  }
});
</script>

<style scoped>
.btn {
  margin-left: 10px;
}
</style>