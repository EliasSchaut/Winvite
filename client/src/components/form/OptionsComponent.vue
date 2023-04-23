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
import { defineComponent, ref, watch } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { query } from '@/util/graphql';
import gql from 'graphql-tag';
import type { OptionModel } from '@/types/models/option.model';
import { get_locale } from '@/main';

export default defineComponent({
  name: 'OptionsComponent',
  components: { ModalComponent },
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
    const gql_options = ref<OptionModel[]>([]);

    query(gql`
      query get_options {
        options {
          id
          name
          label
          warning
        }
      }
    `).then((res) => {
      gql_options.value = res.options;
    });

    watch(get_locale, () => {
      query(gql`
        query get_options {
          options {
            label
            warning
          }
        }`)
        .then((data) => {
          gql_options.value = gql_options.value.map((gql_option, i) => {
            gql_option.label = data.options[i].label;
            gql_option.warning = data.options[i].warning;
            return gql_option;
          });
        });
    });

    return {
      gql_options
    };
  }
});
</script>

<style scoped></style>
