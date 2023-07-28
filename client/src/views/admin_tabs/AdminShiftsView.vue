<template>
  <TableComponent
    id="admin_guest_table"
    :head="[$t('shifts.table.stand'), $t('shifts.table.time'), $t('shifts.table.used_spots')]"
  >
    <template v-for="shift in shifts">
      <template v-for="(slot, slot_index) in shift.slots">
        <tr v-for="(spot, spot_index) in slot.num_of_participants" class="align-middle">
          <td
            v-if="spot_index + slot_index === 0"
            :rowspan="shift.slots.length * slot.num_of_participants"
          >
            {{ shift.name }}
          </td>
          <td
            v-if="spot_index === 0"
            :rowspan="slot.num_of_participants"
            v-html="
              `${dayjs(slot.start).format('LT')}&nbsp;&#8209;&nbsp;${dayjs(slot.end).format('LT')}`
            "
          ></td>
          <td v-if="spot_index < slot!.num_of_participants - slot!.free_spots">
            {{ slot!.acquired_from_guests[spot_index].first_name }}
            {{ slot!.acquired_from_guests[spot_index].last_name }}
          </td>
          <td v-else>
            <b>{{ $t('shifts.table.free') }}!</b>
          </td>
        </tr>
      </template>
    </template>
  </TableComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TableComponent from '@/components/TableComponent.vue'
import { query } from '@/util/graphql'
import gql from 'graphql-tag'
import type { ShiftModel } from '@/types/models/shift.model'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'AdminGuestView',
  methods: { dayjs },
  components: { TableComponent },
  setup() {
    const shifts = ref<ShiftModel[]>()

    query(gql`
      query {
        shifts {
          id
          name
          slots {
            id
            start
            end
            num_of_participants
            free_spots
            acquired_from_guests {
              first_name
              last_name
            }
          }
        }
      }
    `).then((data) => {
      console.log(data.shifts)
      shifts.value = data.shifts
    })
    return {
      shifts
    }
  }
})
</script>

<style scoped></style>
