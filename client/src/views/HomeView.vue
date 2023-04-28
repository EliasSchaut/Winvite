<template>
  <div class="content">
    <div v-if="store.server.video" class="video">
      <video controls :src="`/vid/${store.server.name}/${store.server.video}`" volume="0.5"></video>
    </div>

    <p class="capture center huge handwritten">
      <b>{{ $t('home.title') }}</b>
    </p>

    <div class="adds">
      <AdComponent
        v-for="ad in ads"
        :content="ad.content"
        :img="ad.img as string"
        :link="ad.link as string"
        :title="ad.title"
      />
    </div>

    <p class="capture center huge handwritten">
      <b v-if="!store.logged_in">{{ $t('home.join.title') }}</b>
      <b v-else>{{ $t('shifts.choose.title') }}</b>
    </p>
    <p v-if="!store.logged_in" class="center">
      {{ $t('home.details.intro') }}
      <router-link to="/details">{{ $t('home.details.link') }}</router-link
      >!
    </p>
    <p v-else class="center">{{ $t('shifts.choose.want_help') }}</p>

    <BigButtonComponent>
      <router-link
        v-if="!store.logged_in"
        class="btn btn-success join_margin"
        to="/join"
        type="button"
      >
        {{ $t('home.join.button') }}
      </router-link>
      <router-link v-else class="btn btn-success join_margin" to="/shifts" type="button">
        {{ $t('home.shift.button') }}
      </router-link>
    </BigButtonComponent>
  </div>
</template>

<script lang="ts">
import { query } from '@/util/graphql'
import gql from 'graphql-tag'
import { defineComponent, ref, watch } from 'vue'
import type { AdModel } from '@/types/models/ad.model'
import { get_locale } from '@/main'
import AdComponent from '@/components/AdComponent.vue'
import BigButtonComponent from '@/components/BigButtonComponent.vue'
import { store } from '@/util/store'

export default defineComponent({
  name: 'HomeView',
  computed: {
    store() {
      return store
    }
  },
  components: { BigButtonComponent, AdComponent },
  setup() {
    const ads = ref<AdModel[]>([])
    query(gql`
      query ads {
        ads {
          title
          content
          link
          img
        }
      }
    `).then((data) => {
      ads.value = data.ads
    })

    watch(get_locale, () => {
      query(gql`
        query ads {
          ads {
            title
            content
          }
        }
      `).then((data) => {
        ads.value = ads.value.map((ad, i) => {
          ad.content = data.ads[i].content
          ad.title = data.ads[i].title
          return ad
        })
      })
    })

    return {
      ads
    }
  }
})
</script>

<style scoped>
.video {
  display: flex;
  flex-direction: column;
  width: min(800px, 90vw);
  margin: 30px 0;
  align-self: center;
}

.adds {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
}
</style>
