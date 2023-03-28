<template>
  <NotImplementedComponent />
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import NotImplementedComponent from '@/components/err/NotImplementedComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    NotImplementedComponent
  }
});
</script>
