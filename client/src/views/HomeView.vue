<template>
  <div class="content">
    <div class="video">
      <video controls src="/vid/was_geht.mp4" volume="0.5"></video>
    </div>

    <p class="capture center huge handwritten">
      <b>{{ $t('home.title') }}</b>
    </p>

    <div class="adds">
      <div v-for="ad in ads" class="add card">
        <img
          v-if="ad.img !== null"
          :alt="ad.title"
          :src="`/img/${ad.img}`"
          class="card-img-top"
          width="600"
        />
        <div class="card-body">
          <p class="card-title capture big">
            <b>{{ ad.title }}</b>
          </p>
          <p class="card-text" v-html="ad.content"></p>
        </div>
      </div>
    </div>

    <p class="capture center huge handwritten">
      <b>{{ $t('home.join.title') }}</b>
    </p>

    <div class="arrows">
      <img
        id="arrow-down"
        alt="arrow-down"
        class="arrow"
        src="@/assets/svg/arrow-down-circle-fill.svg"
      />
      <div>
        <img
          id="arrow-right"
          alt="arrow-right"
          class="arrow"
          src="@/assets/svg/arrow-right-circle-fill.svg"
        />
        <router-link class="btn btn-success join_margin" to="/join" type="button">
          {{ $t('home.join.button') }}>
        </router-link>
        <img
          id="arrow-left"
          alt="arrow-left"
          class="arrow"
          src="@/assets/svg/arrow-left-circle-fill.svg"
        />
      </div>
      <img id="arrow-up" alt="arrow-up" class="arrow" src="@/assets/svg/arrow-up-circle-fill.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { query } from '@/util/graphql';
import gql from 'graphql-tag';
import { defineComponent, ref, watch } from 'vue';
import type { AdModel } from '@/types/models/ad.model';
import { get_locale } from '@/main';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const ads = ref<AdModel[]>([]);
    query(gql`
      query ads {
        ads {
          title
          content
          link
          img
        }
      }`).then((data) => {
      ads.value = data.ads;
    });

    watch(get_locale, () => {
      query(gql`
        query ads {
          ads {
            title
            content
          }
        }`).then((data) => {
        ads.value = ads.value.map((ad, i) => {
          ad.content = data.ads[i].content;
          ad.title = data.ads[i].title;
          return ad;
        });
      });
    });

    return {
      ads
    };
  }
});
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

.add {
    width: 600px;
    margin: 20px 0;
}
</style>
