<template>
  <TableComponent id="admin_guest_table" :head="table_head"> </TableComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TableComponent from '@/components/TableComponent.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AdminGuestView',
  components: { TableComponent },
  setup() {
    const { t } = useI18n()
    const table_head = ref<String[]>([
      t('common.form.first_name.label'),
      t('common.form.last_name.label')
    ])

    return {
      table_head
    }
  }
})
</script>

<style scoped></style>
