<template>
  <InputComponent
    :label="$t('common.form.last_name.label')"
    type="text"
    placeholder="Mustermann"
    name="last_name"
    pattern="^[A-Z].{2,20}$"
    :invalid_feedback="$t('common.form.last_name.invalid_feedback')"
    required />
</template>

<script lang="ts">
import InputComponent from "@/components/form/InputComponent.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "FirstNameComponent",
  components: { InputComponent }
});
</script>

<style scoped>

</style>