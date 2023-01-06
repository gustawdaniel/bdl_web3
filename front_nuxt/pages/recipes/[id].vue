<script lang="ts" setup>

import {definePageMeta, ref, useCookie, useLazyFetch, useRoute, useRouter, useRuntimeConfig, watch} from "#imports";
const config = useRuntimeConfig();
const route = useRoute()
const router = useRouter()
const token = useCookie('token')

definePageMeta({
  layout: 'panel'
})

const {data, error, execute, pending} = await useLazyFetch<{ jwt: string }>(`${config.public.baseUrl}/api/recipes/${route.params.id}?populate=*`, {
})

const mealBody = ref<{data: {name: string, recipe: number}}>({data: {name: '', recipe: NaN}})

const {data: meal, execute: executeMeal} = await useLazyFetch<{ jwt: string }>(`${config.public.baseUrl}/api/meals`, {
  method: 'post',
  body: mealBody,
  immediate: false,
  headers: {
    Authorization: `Bearer ${token.value}`
  },
})

watch(meal, (value) => {
  console.log('meal watch', meal.value)
  router.push(`/meals/${meal.value.data.id}`)
})


async function cook() {
  mealBody.value = {
    data: {
      name: data.value.data.attributes.name,
      recipe: Number(route.params.id)
    }
  }
}
</script>

<template>
  <div v-if="pending">
    Loading...
  </div>
  <div v-else>


    <SingleRecipeCard :recipe="data.data.attributes" @next="cook"/>

<!--    <button @click="cook">Lets cook it</button>-->
  </div>
</template>

<style scoped></style>
