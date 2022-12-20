<template>
  <div v-if="pending && !data">
    Loading...
  </div>
  <div v-else-if="error">
    <pre>{{error}}</pre>
  </div>
  <div v-else class="flex">
    <NuxtLink :to="`/recipes/${recipe.id}`" :key="recipe.id" v-for="recipe in data.data" class="m-1 hover:opacity-90">
      <TopEarningRecipeThinWide :recipe="recipe" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import {useLazyFetch, useRuntimeConfig} from "#imports";
const config = useRuntimeConfig();

const {data, error, execute, pending} = await useLazyFetch<{ jwt: string }>(`${config.public.baseUrl}/api/recipes`, {
  query: {
    populate: 'photo',
    'filters[is_top_earning][$eq]': true
  }
})
</script>

<style scoped>

</style>
