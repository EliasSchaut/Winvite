<template>
  <CardComponent id="card_profile" :header="$t('profile.header')">
    <div class="d-flex flex-column justify-content-between">
      <div class="mb-3">
        <h5 class="card-title">{{ user.first_name + " " + user.last_name }}</h5>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_profile">{{ $t('profile.button.profile') }}</button>
      </div>

      <CardComponent :header="$t('profile.option.title')" nobody>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><a @click.prevent="" href="">{{ $t('profile.option.get_user_data') }}</a></li>
          <li class="list-group-item"><a @click.prevent="" data-bs-toggle="modal" data-bs-target="#modal_delete_account" style="color: red" href="">{{ $t('profile.option.delete_account') }}</a></li>
        </ul>
      </CardComponent>
    </div>
  </CardComponent>

  <!-- Modal: Change Profile -->
  <ModalComponent id="modal_profile" :title="$t('profile.button.profile')">
    <FormComponent :submit="on_submit" class="d-flex flex-column">
      <FirstNameComponent />
      <LastNameComponent />
      <SubmitComponent inner_text="Update" />
    </FormComponent>
  </ModalComponent>

  <!-- Modal: Delete Account -->
  <ModalComponent id="modal_delete_account" :title="$t('profile.option.delete_account')">
    <p style="color: red">{{ $t('profile.form.delete_account.desc') }}</p>
    <br>
    <FormComponent :submit="delete_account" class="d-flex flex-column justify-content-around">
      <SubmitComponent inner_text="Delete" class="btn btn-danger form-submit" />
    </FormComponent>
  </ModalComponent>
</template>

<script lang="ts">
import ModalComponent from "@/components/ModalComponent.vue";
import SubmitComponent from "@/components/form/SubmitComponent.vue";
import InputComponent from "@/components/form/InputComponent.vue";
import { defineComponent, ref } from 'vue';
import CardComponent from "@/components/CardComponent.vue";
import FormComponent from "@/components/form/FormComponent.vue";
import FirstNameComponent from '@/components/form/FirstNameComponent.vue';
import LastNameComponent from '@/components/form/LastNameComponent.vue';
import gql from 'graphql-tag';
import { query } from '@/util/graphql';
import type { GuestModel } from '@/types/models/guest.model';

// @TODO: Fix Profile
export default defineComponent({
  name: "ProfileComponent",
  components: {
    FormComponent,
    CardComponent,
    InputComponent,
    FirstNameComponent,
    LastNameComponent,
    SubmitComponent,
    ModalComponent
  },
  data() {
    return {
      submit: "Update",
      user: ref({} as GuestModel)
    };
  },
  mounted() {
    const challenge = this.$route.params.challenge;
    if (challenge !== "") {
      query(gql`
        query sign_in {
          sign_in(challenge: "${challenge}") {
            barrier_token
          }
        }
      `).then((data) => {
        if (data.sign_in.barrier_token !== null) {
          localStorage.setItem('barrier_token', data.sign_in.barrier_token);
          this.fetch_user();
        }
      });
    } else {
      this.fetch_user();
    }
  },
  methods: {
    on_submit(e: Event) {

    },
    fetch_user() {
      query(gql`
        query user {
          guest {
            first_name
            last_name
            anonymous
            options {
              name
              label
              warning
            }
          }
        }
      `).then((data) => {
        this.user = data.guest as GuestModel;
      });
    },
    delete_account(e: Event) {

    }
  }
});
</script>

<style scoped>
#card_profile {
  width: min(500px, 90vw);
  margin: 20px auto
}

p {
  margin: 0;
}
</style>
