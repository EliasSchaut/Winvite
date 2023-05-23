<template>
  <nav>
    <div class="nav nav-tabs" role="tablist">
      <a
        v-for="tab in tabs"
        :href="'/admin/' + tab.id"
        :class="active === tab.id ? 'nav-link active' : 'nav-link'"
        :id="'nav-tab-' + tab.id"
        data-bs-toggle="tab"
        :data-bs-target="'#tab-' + tab.id"
        role="tab"
        :aria-controls="'tab-' + tab.id"
        :aria-selected="active === tab.id"
        @click="changeTab(tab.id)"
        >{{ tab.name }}
      </a>
    </div>
  </nav>
  <div class="tab-content">
    <div
      v-for="tab in tabs"
      :class="active === tab.id ? 'tab-pane fade show active' : 'tab-pane fade'"
      :id="'tab-' + tab.id"
      role="tabpanel"
      :aria-labelledby="'nav-tab-' + tab.id"
      tabindex="0"
    >
      <component :is="tab.component" />
    </div>
  </div>
</template>

<script lang="ts">
import type { Component } from 'vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TabComponent',
  props: {
    tabs: {
      type: Array<{ id: string; name: string; component: Component }>,
      required: true
    }
  },
  methods: {
    changeTab(tab_id: string) {
      const route = this.$route.matched[0].path.split(':')[0] + tab_id
      window.history.pushState({}, '', route)
    }
  },
  mounted() {
    if (this.$route.params.tab !== '') this.active = this.$route.params.tab as string
  },
  setup(props) {
    const active = ref<string>(props.tabs[0].id)

    return {
      active
    }
  }
})
</script>

<style scoped></style>
