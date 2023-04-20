<template>
  <!-- Options ------------------------------------------------------->
  <div v-for="option in options" class="form-check">
    <input v-if="show_warnings && option.warning !== null" :id="'form_check_' + option.name" :name="option.name"
           class="form-check-input" type="checkbox" data-bs-toggle="modal"
           :data-bs-target="'#modal_' + option.name" :value="option.id">
    <input v-else :id="'form_check_' + option.name" :name="option.name" class="form-check-input" type="checkbox">
    <label v-text="option.label" class="form-check-label" :for="'form_check_' + option.name" />
  </div>
  <!----------------------------------------------------------------->

  <!-- Anonym ------------------------------------------------------->
  <div class="form-check" v-if="show_anonym">
    <input id="form_check_anonymous" name="anonymous" class="form-check-input" type="checkbox">
    <label v-html="$t('profile.option.anonym')" class="form-check-label" for="form_check_anonymous" />
  </div>
  <!----------------------------------------------------------------->

  <!-- Modals ------------------------------------------------------->
  <div v-for="option in options">
    <ModalComponent v-if="show_warnings && option.warning !== null" :title="$t('common.modal.warning')"
                    :id="'modal_' + option.name" show_dismiss_button show_only_once>
      {{ option.warning }}
    </ModalComponent>
  </div>
  <!----------------------------------------------------------------->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue';


export default defineComponent({
  name: "OptionsComponent",
  components: { ModalComponent },
  props: {
    show_anonym: {
      type: Boolean,
      default: false,
    },
    show_warnings: {
      type: Boolean,
      default: false,
    },
    show_clicked: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      required: true,
    }
  },
});
</script>

<style scoped>

</style>