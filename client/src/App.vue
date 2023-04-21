<template>
  <header>
    <NavbarComponent />
  </header>

  <AlertComponent />
  <router-view />
</template>

<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue';
import AlertComponent from '@/components/alert/AlertComponent.vue';
import { store } from '@/util/store';

if (localStorage.getItem('barrier_token') !== null) store.logged_in = true;
</script>

<style scoped>

</style>
