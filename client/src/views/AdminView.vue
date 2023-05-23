<template>
  <CardComponent id="card_admin" header="Admin Panel">
    <TabComponent
      :tabs="[
        {
          id: 'settings',
          name: 'Settings',
          component: NotImplementedComponent
        },
        {
          id: 'guests',
          name: $t('nav.guests'),
          component: AdminGuestView
        },
        {
          id: 'shifts',
          name: $t('nav.shiftings'),
          component: NotImplementedComponent
        }
      ]"
    />
  </CardComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardComponent from '@/components/CardComponent.vue'
import NotImplementedComponent from '@/components/err/NotImplementedComponent.vue'
import TabComponent from '@/components/TabComponent.vue'
import AdminGuestView from '@/views/admin_tabs/AdminGuestView.vue'

export default defineComponent({
  name: 'AdminView',
  computed: {
    AdminGuestView() {
      return AdminGuestView
    },
    NotImplementedComponent() {
      return NotImplementedComponent
    }
  },
  components: { CardComponent, TabComponent },
  setup() {
    return {}
  }
})
</script>

<style scoped>
#card_admin {
  width: min(1200px, 90vw);
  margin: 20px auto;
}
</style>
