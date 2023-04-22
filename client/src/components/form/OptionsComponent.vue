<template>
  <!-- Options ------------------------------------------------------->
  <div v-for="option in gql_options" class="form-check">
    <input
      v-if="show_warnings && option.warning !== null"
      :id="'form_check_' + option.name"
      :data-bs-target="'#modal_' + option.name"
      :value="option.id"
      class="form-check-input"
      data-bs-toggle="modal"
      name="options"
      type="checkbox"
    />
    <input
      v-else
      :id="'form_check_' + option.name"
      :value="option.id"
      class="form-check-input"
      name="options"
      type="checkbox"
    />
    <label v-text="option.label" class="form-check-label" :for="'form_check_' + option.name" />
  </div>
  <!----------------------------------------------------------------->

  <!-- Anonym ------------------------------------------------------->
  <div class="form-check" v-if="show_anonym">
    <input id="form_check_anonymous" class="form-check-input" name="anonymous" type="checkbox" />
    <label
      class="form-check-label"
      for="form_check_anonymous"
      v-html="$t('profile.option.anonym')"
    />
  </div>
  <!----------------------------------------------------------------->

  <!-- Modals ------------------------------------------------------->
  <div v-for="option in gql_options">
    <ModalComponent
      v-if="show_warnings && option.warning !== null"
      :id="'modal_' + option.name"
      :title="$t('common.modal.warning')"
      show_dismiss_button
      show_only_once
    >
      {{ option.warning }}
    </ModalComponent>
  </div>
  <!----------------------------------------------------------------->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { query } from '@/util/graphql';
import gql from 'graphql-tag';
import type { OptionModel } from '@/types/models/option.model';

const gql_options = ref<OptionModel[]>([]);

export default defineComponent({
  name: 'OptionsComponent',
  components: { ModalComponent },
  data() {
    return {
      gql_options
    };
  },
  props: {
    show_anonym: {
      type: Boolean,
      default: false
    },
    show_warnings: {
      type: Boolean,
      default: false
    },
    show_clicked: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    query(gql`
      query get_join {
        options {
          id
          name
          label
          warning
        }
      }
    `).then((res) => {
      gql_options.value = res.options as OptionModel[];
    })
  }
})
</script>

<style scoped></style>
