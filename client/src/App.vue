<template>
  <header>
    <NavbarComponent />
  </header>

  <AlertComponent />
  <router-view />
</template>

<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import AlertComponent from '@/components/alert/AlertComponent.vue'
import { query } from '@/util/graphql'
import gql from 'graphql-tag'
import { store } from '@/util/store'

query(gql`
  query {
    server {
      id
      title
      name
      desc
      video
    }
  }
`).then((data) => {
  store.server = data.server
  document.head.innerHTML += `<title>${data.server.title}</title>`
})
</script>

<style scoped></style>
