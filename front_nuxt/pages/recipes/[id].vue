<script lang="ts" setup>

import {ref, useCookie, useLazyFetch, useRoute, useRouter, useRuntimeConfig, watch} from "#imports";
const config = useRuntimeConfig();
const route = useRoute()
const router = useRouter()
const token = useCookie('token')

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
  <div>
    Recipe: {{ route.params.id }}
  </div>
  <div v-if="pending">
    Loading...
  </div>
  <div v-else>
    <p>{{data.data.attributes.name}}</p>
    <img :src="`${config.public.baseUrl}${data.data.attributes.photo.data.attributes.formats.thumbnail.url}`" alt="">
    <p>nutritions</p>
    <table>
      <tr v-for="nutrition in data.data.attributes.nutrition">
        <td>{{nutrition.name}}</td>
        <td>{{nutrition.value}}</td>
        <td>{{nutrition.unit}}</td>
      </tr>
    </table>
    <p>ingredients</p>
    <ul v-for="ingredient in data.data.attributes.ingredients">
      <li>{{ingredient.name}}</li>
    </ul>

    <button @click="cook">Lets cook it</button>
  </div>
</template>

<style scoped></style>
