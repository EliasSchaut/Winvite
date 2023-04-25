<template>
  <div v-for="detail in details" class="details">
    <h1 :id="detail.title" class="big text-center">{{ detail.title }}</h1>
    <span v-html="detail.content"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { DetailModel } from '@/types/models/detail.model'
import { query } from '@/util/graphql'
import gql from 'graphql-tag'
import { get_locale } from '@/main'

export default defineComponent({
  name: 'DetailsView',
  setup() {
    const details = ref<DetailModel[]>([])
    query(gql`
      query {
        details {
          title
          content
        }
      }
    `).then((data) => {
      details.value = data.details
    })

    watch(get_locale, () => {
      query(gql`
        query {
          details {
            title
            content
          }
        }
      `).then((data) => {
        details.value = data.details
      })
    })

    return {
      details
    }
  }
})
</script>

<style scoped>
.details {
  display: flex;
  width: min(90vw, 900px);
  flex-direction: column;
  justify-content: center;
  margin: 20px auto 20px;
  align-items: center;
  font-size: larger;
}
</style>
