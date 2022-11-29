<script lang="ts" setup>
const props = defineProps<{
  data: any
}>()
</script>

<template>
  <div>
    Component: SingleMealCard

    <p>ID: {{props.data.data.id}}</p>
  </div>
</template>

<style scoped></style>
