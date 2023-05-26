<template>
  <CardComponent id="card_profile" :header="$t('profile.header')">
    <div class="d-flex flex-column justify-content-between">
      <div class="mb-3">
        <h5 class="card-title">{{ user.first_name + ' ' + user.last_name }}</h5>
        <button
          class="btn btn-primary mb-2 me-2"
          data-bs-target="#modal_profile"
          data-bs-toggle="modal"
          type="button"
          @click="set_options"
        >
          {{ $t('profile.button.profile') }}
        </button>
        <button class="btn btn-secondary mb-2" @click.prevent="copy_to_clipboard(user.challenge)">
          <span class="d-flex flex-row align-items-center">
            <span>{{ $t('profile.button.login_link') }}&nbsp;</span>
            <img alt="copy_img" src="@/assets/svg/intersect.svg" />
          </span>
        </button>
      </div>

      <CardComponent :header="$t('profile.option.title')" nobody>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="form-switch">
              <input
                id="switch_emails"
                :checked="user.anonymous"
                class="form-check-input"
                name="anonymous"
                role="switch"
                type="checkbox"
                @click="update_anonymous"
              />
              <label class="form-check-label ms-2" for="switch_emails">{{
                $t('common.guest.anonym')
              }}</label>
            </div>
          </li>
          <li class="list-group-item">
            <a href="" @click.prevent="get_all_user_data">{{
              $t('profile.option.get_user_data')
            }}</a>
          </li>
          <li class="list-group-item">
            <a
              data-bs-target="#modal_delete_account"
              data-bs-toggle="modal"
              href=""
              style="color: red"
              @click.prevent=""
              >{{ $t('profile.option.delete_account') }}</a
            >
          </li>
        </ul>
      </CardComponent>
    </div>
  </CardComponent>

  <!-- Modal: Change Profile -->
  <ModalComponent id="modal_profile" :title="$t('profile.button.profile')">
    <FormComponent :submit="update_profile" class="d-flex flex-column">
      <FirstNameComponent :value="user.first_name" />
      <LastNameComponent :value="user.last_name" />
      <OptionsComponent />
      <SubmitComponent class="mt-3" inner_text="Update" />
    </FormComponent>
  </ModalComponent>

  <!-- Modal: Delete Account -->
  <ModalComponent id="modal_delete_account" :title="$t('profile.option.delete_account')">
    <p style="color: red">{{ $t('profile.form.delete_account.desc') }}</p>
    <br />
    <FormComponent :submit="delete_account" class="d-flex flex-column justify-content-around">
      <SubmitComponent inner_text="Delete" class="btn btn-danger form-submit" />
    </FormComponent>
  </ModalComponent>
</template>

<script lang="ts">
import ModalComponent from '@/components/ModalComponent.vue'
import SubmitComponent from '@/components/form/SubmitComponent.vue'
import { defineComponent, ref } from 'vue'
import CardComponent from '@/components/CardComponent.vue'
import FormComponent from '@/components/form/FormComponent.vue'
import FirstNameComponent from '@/components/form/FirstNameComponent.vue'
import LastNameComponent from '@/components/form/LastNameComponent.vue'
import gql from 'graphql-tag'
import { log_in, log_out, mutation, query } from '@/util/graphql'
import type { GuestModel } from '@/types/models/guest.model'
import OptionsComponent from '@/components/form/OptionsComponent.vue'
import { store } from '@/util/store'

export default defineComponent({
  name: 'ProfileComponent',
  components: {
    OptionsComponent,
    FormComponent,
    CardComponent,
    FirstNameComponent,
    LastNameComponent,
    SubmitComponent,
    ModalComponent
  },
  mounted() {
    const challenge = this.$route.params.challenge as string
    if (challenge !== '') {
      log_in(challenge).then((success) => {
        if (success) this.fetch_user()
      })
    } else {
      this.fetch_user()
    }
  },
  methods: {
    update_profile(e: Event, data: FormData) {
      this.update_user({
        user_data: {
          first_name: data.get('first_name') as string,
          last_name: data.get('last_name') as string,
          option_ids: data.getAll('options').map((option) => Number(option))
        }
      }).then(() => {
        this.fetch_user()
        const form = e.target as HTMLFormElement
        form.setAttribute('data-bs-dismiss', 'modal')
        form.click()
        form.removeAttribute('data-bs-dismiss')
      })
    },
    update_anonymous(e: Event) {
      this.update_user({
        user_data: {
          anonymous: (e.target as HTMLInputElement).checked
        }
      }).then(() => {
        query(gql`
          query user {
            guest {
              anonymous
            }
          }
        `).then((data) => {
          this.user.anonymous = data.guest.anonymous
        })
      })
    },
    delete_account(e: Event) {
      this.delete_user().then(() => {
        log_out()
        const form = e.target as HTMLFormElement
        form.setAttribute('data-bs-dismiss', 'modal')
        form.click()
        form.removeAttribute('data-bs-dismiss')
        this.$router.push('/')
      })
    },
    fetch_user() {
      query(gql`
        query user {
          guest {
            first_name
            last_name
            anonymous
            challenge
            options {
              id
              name
              label
              warning
            }
          }
        }
      `).then((data) => {
        this.user = data.guest as GuestModel
      })
    },
    set_options() {
      const ids = this.user.options!.map((option) => option.id)
      for (const html_option of document.getElementsByName('options')) {
        ;(html_option as HTMLInputElement).checked = ids.includes(
          Number((html_option as HTMLInputElement).value)
        )
      }
    },
    copy_to_clipboard(challenge: string) {
      navigator.clipboard.writeText(`${window.location.origin}/profile/${challenge}`)
      store.show_alert('info', this.$t('profile.copied'))
    },
    get_all_user_data(e: Event) {
      query(gql`
        query {
          guest {
            id
            first_name
            last_name
            anonymous
            is_admin
            challenge
            options {
              id
              name
              label
              warning
            }
            shift_slots {
              id
              end
              start
            }
          }
        }
      `).then((data) => {
        const json = JSON.stringify(data)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'user_data.json'
        link.click()
        URL.revokeObjectURL(url)
        link.remove()
      })
    }
  },
  setup() {
    const user = ref<GuestModel>({
      id: -1,
      challenge: '',
      first_name: '‎',
      last_name: '‎',
      anonymous: false,
      is_admin: false,
      options: []
    })

    const update_user = mutation(gql`
      mutation update_user($user_data: GuestUpdateInputModel!) {
        update_guest(guest_update_data: $user_data) {
          id
        }
      }
    `)

    const delete_user = mutation(gql`
      mutation delete_user {
        delete_guest {
          id
        }
      }
    `)

    return {
      user,
      update_user,
      delete_user
    }
  }
})
</script>

<style scoped>
#card_profile {
  width: min(500px, 90vw);
  margin: 20px auto;
}

p {
  margin: 0;
}
</style>
