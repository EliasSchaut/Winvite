<template>
  <form novalidate @submit.prevent="submitVal">
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormComponent',
  props: {
    submit: {
      type: Function,
      required: true
    }
  },
  methods: {
    submitVal(e: Event) {
      const form_html = e.target as HTMLFormElement;
      if (!form_html.checkValidity()) {
        form_html.classList.add('was-validated');
      } else {
        this.submit(e, new FormData(form_html));
      }
    }
  }
})
</script>

<style scoped></style>
