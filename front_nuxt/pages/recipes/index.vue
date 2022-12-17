<script lang="ts" setup>
import {useLazyFetch, useRuntimeConfig} from "#imports";
const config = useRuntimeConfig();

const {data, error, execute, pending} = await useLazyFetch<{ jwt: string }>(`${config.public.baseUrl}/api/recipes`, {
  query: {
    populate: 'photo'
  }
})
</script>

<template>
  <div v-if="pending">
    Loading...
  </div>
  <div v-else>
    <div
        :key="recipe.id" v-for="recipe in data.data" style="border: solid 1px black; margin: 10px;">
<!--      <pre>{{recipe.attributes}}</pre>-->
      <p>{{recipe.attributes.name}}</p>

      <img
          v-if="recipe.attributes.photo.data && recipe.attributes.photo.data.attributes.formats"
          :src="`${config.public.baseUrl}${recipe.attributes.photo.data.attributes.formats.thumbnail.url}`"
          alt="">

      <p>{{recipe.attributes.cooking_time_value}} {{recipe.attributes.cooking_time_unit}}</p>
      <p>reward: {{recipe.attributes.dish_reward_for_cooking}}</p>
      <p>cooked: {{recipe.attributes.cooking_counter}}</p>
      <nuxt-link :to="`/recipes/${recipe.id}`">
        <button>Go</button>
      </nuxt-link>
    </div>

    <pre>TODO: pagination</pre>
    <nuxt-link to="/login"><button>Login Page</button></nuxt-link>
    <nuxt-link to="/profile"><button>Profile</button></nuxt-link>
  </div>
</template>

<style scoped></style>
