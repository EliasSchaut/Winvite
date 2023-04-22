<template>
  <div :id="id" class="modal fade" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <slot v-if="spawn_over_body" />
        <div v-else class="modal-body">
          <slot />
        </div>
        <div v-if="show_dismiss_button" class="modal-footer">
          <button class="btn btn-primary" data-bs-dismiss="modal" type="button">
            {{ dispose }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardComponent',
  data() {
    return {
      dispose: 'Verstanden'
    };
  },
  mounted() {
    if (this.show_only_once) {
      const modal = document.getElementById(this.id)!;
      modal.addEventListener('hide.bs.modal', () => {
        modal.remove();
      });
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    spawn_over_body: {
      type: Boolean,
      default: false
    },
    show_dismiss_button: {
      type: Boolean,
      default: false
    },
    show_only_once: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped></style>
