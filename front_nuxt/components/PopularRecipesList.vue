<template>
  <div v-if="pending">
    Loading...
  </div>
  <div v-else-if="error">
    <pre>{{error}}</pre>
  </div>
  <div v-else class="flex">
    <div :key="recipe.id" v-for="recipe in data.data" class="m-1">
      <PopularRecipeThinCard :recipe="recipe" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useLazyFetch, useRuntimeConfig} from "#imports";
const config = useRuntimeConfig();

const {data, error, execute, pending} = await useLazyFetch<{ jwt: string }>(`${config.public.baseUrl}/api/recipes`, {
  query: {
    populate: 'photo',
    'filters[is_popular][$eq]': true
  }
})
</script>

<style scoped>

</style>
