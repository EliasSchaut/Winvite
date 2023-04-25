<template>
  <div class="content">
    <p class="capture center huge handwritten">
      <b>{{ $t('shifts.title') }}</b>
    </p>

    <div class="table-responsive">
      <table class="table table-striped" style="width: min(600px, 90vw); margin: auto">
        <thead>
          <tr>
            <th scope="col">{{ $t('shifts.table.info') }}</th>
            <th scope="col">{{ $t('shifts.table.stand') }}</th>
            <th scope="col">{{ $t('shifts.table.time') }}</th>
            <th scope="col">{{ $t('shifts.table.used_spots') }}</th>
            <th scope="col">{{ $t('shifts.table.take_slot') }}</th>
          </tr>
        </thead>

        <!-- Aufbau -->
        <tbody v-for="shift in shifts">
          <tr v-for="(slot, number) in shift.slots" class="align-middle">
            <td>
              <button
                class="btn btn-secondary"
                data-bs-target="#shifts_modal"
                data-bs-toggle="modal"
                @click.prevent="
                  () => {
                    modal.title = shift.name
                    modal.body = shift.desc
                  }
                "
              >
                <img alt="info" src="@/assets/svg/info-circle-fill.svg" />
              </button>
            </td>
            <td v-if="number === 0" :rowspan="shift.slots.length">{{ shift.name }}</td>
            <td
              v-html="
                `${dayjs(slot.start).format('LT')}&nbsp;&#8209;&nbsp;${dayjs(slot.end).format(
                  'LT'
                )}`
              "
            />
            <td v-if="slot.num_of_participants !== undefined && slot.free_spots !== undefined">
              {{ `${slot!.num_of_participants - slot!.free_spots}/${slot!.num_of_participants}` }}
            </td>
            <td v-else>
              {{ `?/?` }}
            </td>

            <td>
              <button
                v-if="user_slots.includes(slot.id)"
                :disabled="!store.logged_in"
                class="btn btn-dark"
                @click.prevent="(e: Event) => update_user_shifts(e, slot.id)"
              >
                <img
                  v-if="user_slots.includes(slot.id)"
                  alt="took_slot"
                  src="@/assets/svg/toggle2-on.svg"
                />
              </button>
              <button
                v-else-if="slot.free_spots === 0 || slot.free_spots === undefined"
                class="btn btn-dark"
                disabled
              >
                <img alt="cannot_take_slot" src="@/assets/svg/x-circle.svg" />
              </button>
              <button
                v-else
                :disabled="!store.logged_in"
                class="btn btn-dark"
                @click.prevent="(e: Event) => update_user_shifts(e, slot.id)"
              >
                <img alt="take_slot" src="@/assets/svg/toggle2-off.svg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="capture center huge handwritten">
      <b>{{ $t('shifts.choose.title') }}</b>
    </p>

    <p class="center">
      <span>{{ $t('shifts.choose.want_help') }}</span>
      <span v-if="!store.logged_in"><br />{{ $t('shifts.choose.please_log_in') }}</span>
    </p>

    <ModalComponent id="shifts_modal" :title="modal.title" show_dismiss_button>
      <p>{{ modal.body }}</p>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { ShiftModel } from '@/types/models/shift.model'
import { mutation, query } from '@/util/graphql'
import gql from 'graphql-tag'
import ModalComponent from '@/components/ModalComponent.vue'
import dayjs from 'dayjs'
import { get_locale } from '@/main'
import { store } from '@/util/store'

export default defineComponent({
  name: 'ShiftsView',
  components: {
    ModalComponent: ModalComponent
  },
  computed: {
    store() {
      return store
    }
  },
  methods: {
    dayjs,
    update_user_shifts(e: Event, slot_id: number) {
      if (this.user_slots.includes(slot_id)) {
        this.user_slots.splice(this.user_slots.indexOf(slot_id), 1)
      } else {
        this.user_slots.push(Number(slot_id))
      }
      console.log(this.user_slots)

      this.update_shifts({
        shift_slots: this.user_slots
      }).then((res: any) => {
        console.log(res.data)
        this.user_slots = res.data.update_guest.shift_slots!.map((slot: { id: number }) => slot.id)

        query(gql`
          query {
            shifts {
              slots {
                free_spots
              }
            }
          }
        `).then((data) => {
          this.shifts = this.shifts.map((shift: ShiftModel) => {
            return {
              ...shift,
              slots: shift.slots.map((slot: any, index: number) => {
                return {
                  ...slot,
                  free_spots: data.shifts[index].slots[index].free_spots
                }
              })
            }
          })
        })
      })
    }
  },
  setup() {
    const shifts = ref<ShiftModel[]>([])
    const user_slots = ref<number[]>([])
    const update_shifts = mutation(gql`
      mutation update_guest($shift_slots: [Int!]!) {
        update_guest(guest_update_data: { shift_slot_ids: $shift_slots }) {
          shift_slots {
            id
          }
        }
      }
    `)

    const query_shifts = () => {
      query(gql`
        query {
          shifts {
            name
            desc
            slots {
              id
              start
              end
              num_of_participants
              free_spots
            }
          }
        }
      `).then((data) => {
        shifts.value = data.shifts
      })
    }

    if (store.logged_in) {
      query(gql`
        query {
          guest {
            shift_slots {
              id
            }
          }
        }
      `).then((data) => {
        user_slots.value = data.guest.shift_slots.map((slot: { id: number }) => slot.id)
      })
    }
    watch(get_locale, query_shifts)
    query_shifts()
    return {
      shifts,
      user_slots,
      update_shifts,
      modal: ref({
        title: '',
        body: ''
      })
    }
  }
})
</script>

<style scoped>
.content {
  width: 90vw;
  margin: 0 auto 30px;
}
</style>
