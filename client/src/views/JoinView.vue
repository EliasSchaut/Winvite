<template>
  <div class="form-intro">
    <p class="big">
      <b>{{ $t('join.title') }}</b>
    </p>
    <p>{{ $t('join.subtitle') }}</p>
  </div>

  <FormComponent :submit="form_submit" class="form">
    <FirstNameComponent />
    <LastNameComponent />
    <OptionsComponent show_anonym show_warnings />

    <button
      v-if="!loading"
      id="button_submit"
      class="btn btn-primary form-submit"
      data-bs-placement="bottom"
      type="submit"
    >
      {{ $t('common.form.submit') }}
    </button>

    <button
      v-if="loading"
      id="button_loading"
      class="btn btn-primary form-submit"
      disabled
      type="submit"
    >
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      {{ $t('common.form.loading') }}
    </button>
  </FormComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import gql from 'graphql-tag'
import { store } from '@/util/store'
import FirstNameComponent from '@/components/form/FirstNameComponent.vue'
import LastNameComponent from '@/components/form/LastNameComponent.vue'
import FormComponent from '@/components/form/FormComponent.vue'
import { log_in, mutation } from '@/util/graphql'
import OptionsComponent from '@/components/form/OptionsComponent.vue'

export default defineComponent({
  name: 'JoinView',
  components: { OptionsComponent, FormComponent, FirstNameComponent, LastNameComponent },
  data() {
    return {
      loading: ref(false)
    }
  },
  methods: {
    async form_submit(event: Event) {
      const form_data = new FormData(event.target as HTMLFormElement)
      this.loading = true
      this.add_guest({
        guest_input_data: {
          first_name: form_data.get('first_name'),
          last_name: form_data.get('last_name'),
          anonymous: form_data.get('anonymous') === 'on',
          option_ids: form_data.getAll('options').map((option_id) => Number(option_id))
        }
      })
        .then((res) => {
          const challenge = res!.data.guest.challenge
          store.show_alert(
            'success',
            this.$t('join.success', { link: `${window.location.origin}/profile/${challenge}` })
          )
          log_in(challenge).then(() => this.$router.push(`/profile`))
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  setup() {
    const add_guest = mutation(gql`
      mutation add_guest($guest_input_data: GuestInputModel!) {
        guest(guest_input_data: $guest_input_data) {
          id
          challenge
        }
    ;  }
    `)

    return {
      add_guest
    }
  }
})
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
  margin-top: 20px;
}
</style>
