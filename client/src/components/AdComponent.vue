<template>
  <div class="add card">
    <img
      v-if="img"
      :alt="title"
      :src="`/img/${store.server.name}/${img}`"
      class="card-img-top"
      width="600"
    />
    <div class="card-body">
      <p class="card-title capture big">
        <a v-if="link" :href="link" target="_blank"
          ><b>{{ title }}</b></a
        >
        <b v-else>{{ title }}</b>
      </p>
      <p class="card-text" v-html="content"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '@/util/store'

export default defineComponent({
  name: 'AdComponent',
  computed: {
    store() {
      return store
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: false
    }
  }
})
</script>

<style scoped>
.add {
  width: 600px;
  margin: 20px 0;
}
</style>
