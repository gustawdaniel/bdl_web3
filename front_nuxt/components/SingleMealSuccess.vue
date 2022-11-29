<script lang="ts" setup>
const props = defineProps<{
  title: string,
  description: string,
  showHistory?: boolean
}>()
</script>

<template>
  <div>
    Component: SingleMealSuccess

    <h1>{{props.title}}</h1>

    <p>{{props.description}}</p>

    <nuxt-link
        v-if="props.showHistory"
        to="/meals"
    >
    <button>Show my meals</button>
    </nuxt-link>
  </div>
</template>

<style scoped></style>
