<template>
  <p class="capture center huge handwritten">
    <b>{{ $t('shifts.title') }}</b>
  </p>

  <table class="table table-bordered border-dark" style="width: min(600px, 90vw); margin: auto">
    <thead>
      <tr>
        <th scope="col">{{ $t('shifts.table.stand') }}</th>
        <th scope="col">{{ $t('shifts.table.time') }}</th>
        <th scope="col">{{ $t('shifts.table.used_spots') }}</th>
      </tr>
    </thead>

    <!-- Aufbau -->
    <tbody v-for="shift in shifts">
      <tr v-for="(slot, number) in shift.slots">
        <td v-if="number === 0" :rowspan="shift.slots.length">{{ shift.name }}</td>
        <td>{{ `${dayjs(slot.start).format('LT')} - ${dayjs(slot.end).format('LT')}` }}</td>
        <td>{{ `${slot.num_of_participants - slot.free_spots}/${slot.num_of_participants}` }}</td>
      </tr>
    </tbody>
  </table>

  <p class="capture center huge handwritten">
    <b>{{ $t('shifts.choose.title') }}</b>
  </p>

  <p class="center">
    <span>{{ $t('shifts.choose.want_help') }}</span>
    <span v-if="!store.logged_in"><br />{{ $t('shifts.choose.please_log_in') }}</span>
  </p>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { ShiftModel } from '@/types/models/shift.model'
import { query } from '@/util/graphql'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import { get_locale } from '@/main'
import { store } from '@/util/store'

export default defineComponent({
  name: 'ShiftsView',
  computed: {
    store() {
      return store
    }
  },
  methods: { dayjs },
  setup() {
    const shifts = ref<ShiftModel[]>([])
    const query_shifts = () => {
      query(gql`
        query {
          shifts {
            name
            desc
            slots {
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

    watch(get_locale, query_shifts)
    query_shifts()

    return {
      shifts
    }
  },
  data() {
    return {
      help: {
        title: 'Wähle deine Schicht!',
        desc: 'Du willst mir bei meinem Geburtstag unter die Arme greifen?<br>Sehr gut! Dann trage dich gerne unten in eine Schicht ein!'
      }
    }
  }
})
</script>

<style scoped></style>
