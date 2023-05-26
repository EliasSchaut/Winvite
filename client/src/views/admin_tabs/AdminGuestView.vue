<template>
  <TableComponent id="admin_guest_table" :head="table_head" sortable>
    <tr v-for="guest in guests">
      <td :data-sort="guest.first_name">{{ guest.first_name }}</td>
      <td :data-sort="guest.last_name">{{ guest.last_name }}</td>
      <td :data-sort="guest.anonymous ? 0 : 1">
        <img v-if="guest.anonymous" alt="check_icon" src="@/assets/svg/check-circle.svg" />
        <img v-else alt="cross_icon" src="@/assets/svg/x-circle.svg" />
      </td>
      <td
        v-for="option_id in option_ids"
        :data-sort="(guest.options!.find((option) => option.id === option_id)) ? 0 : 1"
      >
        <img
          v-if="guest.options!.find((option) => option.id === option_id)"
          alt="check_icon"
          src="@/assets/svg/check-circle.svg"
        />
        <img v-else alt="cross_icon" src="@/assets/svg/x-circle.svg" />
      </td>
    </tr>
  </TableComponent>

  <TableComponent id="admin_guest_table_sum" :head="option_names">
    <tr>
      <td>
        <b>{{ $t('common.table.total') }}</b>
      </td>
      <td>
        {{ guests!.filter((guest) => guest.anonymous).length }}
      </td>
      <td v-for="option in option_ids">
        {{
          guests!.filter((guest) => guest.options!.find((option2) => option2.id === option)).length
        }}
      </td>
    </tr>
  </TableComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TableComponent from '@/components/TableComponent.vue'
import { query } from '@/util/graphql'
import gql from 'graphql-tag'
import type { GuestModel } from '@/types/models/guest.model'
import type { OptionModel } from '@/types/models/option.model'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AdminGuestView',
  components: { TableComponent },
  setup() {
    const { t } = useI18n()
    const guests = ref<[GuestModel]>()
    const option_ids = ref<number[]>()
    const option_names = ref<string[]>([' ', t('common.guest.anonym')])
    const table_head = ref<string[]>([
      t('common.form.first_name.label'),
      t('common.form.last_name.label'),
      t('common.guest.anonym')
    ])

    query(gql`
      query {
        guests_full {
          id
          first_name
          last_name
          anonymous
          options {
            id
          }
        }
      }
    `).then((data) => {
      guests.value = data.guests_full
    })

    query(gql`
      query {
        options {
          id
          name
        }
      }
    `).then((data) => {
      option_ids.value = (data.options as OptionModel[]).map((option: OptionModel) => {
        table_head.value.push(option.name)
        option_names.value.push(option.name)
        return option.id
      })
    })
    return {
      guests,
      option_ids,
      option_names,
      table_head: table_head
    }
  }
})
</script>

<style scoped></style>
