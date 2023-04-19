<template>
  <!-- Alerts ------------------------------------------------------->
  <div v-if="$route.params.status === 'error'" id="alert_error" class="form alert alert-danger" role="alert">
    <span v-html="status.error" />
  </div>
  <div v-if="$route.params.status === 'not_acceptable'" id="alert_invalid_name" class="form alert alert-danger"
       role="alert">
    <span v-html="status.not_acceptable" />
  </div>
  <div v-if="$route.params.status === 'duplicate'" id="alert_not_acceptable" class="form alert alert-danger"
       role="alert">
    <span v-html="status.duplicate" />
  </div>
  <!----------------------------------------------------------------->


  <!-- From ------------------------------------------------------->
  <div class="form-intro">
    <p class="big"><b>Melde dich an!</b></p>
    <p>Damit stehst du automatisch auf der Gästeliste und bist dabei!</p>
  </div>

  <FormComponent :submit="form_submit" class="form">
    <FirstNameComponent />
    <LastNameComponent />
    <div v-for="option in gql_options" class="form-check">
      <input v-if="option.warning !== null" :id="'form_check_' + option.name" :name="option.name"
             class="form-check-input" type="checkbox" data-bs-toggle="modal"
             :data-bs-target="'#modal_' + option.name">
      <input v-else :id="'form_check_' + option.name" :name="option.name" class="form-check-input" type="checkbox">
      <label v-text="option.label" class="form-check-label" :for="'form_check_' + option.name" />
    </div>
    <div class="form-check">
      <input id="form_check_anonymous" name="anonymous" class="form-check-input" type="checkbox">
      <label v-html="form.anonym.label" class="form-check-label" for="form_check_anonymous" />
    </div>

    <button v-if="!loading" id="button_submit" type="submit" class="btn btn-primary form-submit"
            data-bs-placement="bottom">
      {{ form.submit.name }}
    </button>

    <button v-if="loading" id="button_loading" type="submit" class="btn btn-primary form-submit" disabled>
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      {{ form.submit.loading }}
    </button>
  </FormComponent>
  <!----------------------------------------------------------------->


  <!-- Modals ------------------------------------------------------->
  <ModalComponent v-for="option in gql_options_filtered" :title="form.modal.title"
                  :id="'modal_' + option.name" show_dismiss_button show_only_once>
    {{ option.warning }}
  </ModalComponent>
  <!----------------------------------------------------------------->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import gql from 'graphql-tag';
import ModalComponent from '@/components/ModalComponent.vue';
import type { OptionModel } from '@/types/models/option.model';
import { store } from '@/util/store';
import FirstNameComponent from '@/components/form/FirstNameComponent.vue';
import LastNameComponent from '@/components/form/LastNameComponent.vue';
import FormComponent from '@/components/form/FormComponent.vue';
import router from '@/router/router';
import { mutation, query } from '@/util/graphql';

export default defineComponent({
  name: 'JoinView',
  components: { FormComponent, FirstNameComponent, LastNameComponent, ModalComponent },
  data() {
    return {
      loading: ref(false),
      api_base: 'https://api.schaut.dev/bday/',

      status: {
        error: 'Error! Es gab einen Fehler bei der Anmeldung! Du bist noch nicht registriert!',
        not_acceptable: 'Error! Dein Name ist ungültig! Dein Name darf nur deutsche <b>Buchstaben</b> und folgende Zeichen enthalten: Leerzeichen, Punkt, Strich, Apostroph (\').<br>Zudem muss jedes Feld mindestens einen Buchstaben enthalten und dein Name darf nicht mehr als 40 Zeichen beinhalten.',
        duplicate: 'Error! Dieser Name ist schon in der Datenbank vorhanden! Falls du dich schon einmal angemeldet hast, solltest du dich nicht nochmal anmelden!'
      },

      form: {
        anonym: {
          label: 'Ich möchte <b>nicht</b> in der <router-link to="/guests/">öffentlichen Gästeliste</router-link> gelistet werden'
        },
        modal: {
          title: 'Achtung!'
        },
        submit: {
          name: 'Bestätigen',
          loading: 'Fertigstellen...'
        }
      }
    };
  },
  methods: {
    async form_submit(event: Event) {
      const form_data = new FormData(event.target as HTMLFormElement);

      const option_ids = []
      for (const option of this.gql_options) {
        if (form_data.get(option.name) === 'on') {
          option_ids.push(Number(option.id));
        }
      }

      this.loading = true;
      this.add_guest({
        guest_input_data: {
          first_name: form_data.get('first_name'),
          last_name: form_data.get('last_name'),
          anonymous: form_data.get('anonymous') === 'on',
          option_ids: option_ids
        }
      }).then((res) => {
        const challenge = res!.data.guest.challenge
        store.show_alert("success", `Du hast dich erfolgreich angemeldet!<br>
        Deine Challenge ist: <b>${challenge}</b><br>
        Bitte notiere dir diesen Code, da du ihn brauchst,
        um in anderen Browsern oder Geräten deine Daten nachträglich zu ändern!
        Du wirst diesen Code kein zweites Mal sehen!`)
        localStorage.setItem("guest_challenge", challenge)
        router.push({ name: 'ProfileView', params: { challenge: challenge } })
      }).finally(() => {
        this.loading = false;
      });
    }
  },
  setup() {
    const gql_options = ref([] as OptionModel[]);
    const gql_options_filtered = ref([] as OptionModel[]);

    const mutate = mutation(gql`
        mutation add_guest($guest_input_data: GuestInputModel!) {
          guest(guest_input_data: $guest_input_data) {
            id
            challenge
          }
        }
      `);

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
      gql_options_filtered.value = (res.options as OptionModel[]).filter((option) => option.warning !== null);
    })

    return {
      add_guest: mutate,
      gql_options,
      gql_options_filtered,
    };
  }
});
</script>

<style scoped>
.form-intro {
    margin: 1em 0;
    text-align: center;
}

.form {
    margin: 30px auto 0;
    width: 400px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.form-submit {
    margin-top: 20px
}

</style>