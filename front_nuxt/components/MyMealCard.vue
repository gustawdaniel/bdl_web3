<template>
  <div class="border rounded-xl flex">
    <aside class="w-20 rounded-l-xl bg-center bg-cover"
           :style="{ backgroundImage: 'url(' + photoUrl(meal) + ')' }"></aside>
    <main class="p-5">
      <h3 class="font-semibold text-sm mb-2">{{ meal.attributes.name }}</h3>

      <!-- CTA -->
      <div>
        <div v-if="!meal.attributes.ingredients_image || !meal.attributes.ingredients_image?.data">
          <button type="button" class="inline-flex items-center rounded-full border border-transparent bg-red-500 px-3 py-1.5
           text-xs text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
           focus:ring-offset-2 font-bold" @click="onClick('ingredients-photo')">Take a photo of ingredients</button>
        </div>
        <div v-else-if="!meal.attributes.meal_image || !meal.attributes.meal_image?.data">
          <button type="button" class="inline-flex items-center rounded-full border border-transparent bg-red-500 px-3 py-1.5
           text-xs text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
           focus:ring-offset-2 font-bold" @click="onClick('meal-photo')">Take a photo of the dish</button>
        </div>
        <div v-else-if="!meal.attributes.social_media_post">
          <button type="button" class="inline-flex items-center rounded-full border border-transparent bg-red-500 px-3 py-1.5
           text-xs text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
           focus:ring-offset-2 font-bold" @click="onClick('social-media')">Share with friends</button>
        </div>
        <div v-else>
          Finished
        </div>
      </div>

      <p class="text-xs flex mt-2">
        <span class="mr-6 text-slate-500">Earned:</span>
        <span class="font-bold flex mr-4">
          <span class="mr-1">{{ meal.attributes.dish_token ?? 0 }}</span>
          <img :src="dish" alt="DISH">
        </span>
        <span class="font-bold flex">
          <span class="mr-1">{{ meal.attributes.adm_token ?? 0 }}</span>
          <img :src="adm" alt="ADM">
        </span>
      </p>
    </main>
    <!--  <nuxt-link :to="`/meals/${meal.id}`"><button>See Meal</button></nuxt-link>-->
    <!--  <nuxt-link :to="`/recipes/${meal.attributes.recipe.data.id}`"><button>See Recipe</button></nuxt-link>-->
    <!--  <nuxt-link :to="`/recipes`"><button>All Recipes</button></nuxt-link>-->
  </div>
</template>

<script lang="ts" setup>
import {Meal} from "~/helpers/api";
import {computed, useRuntimeConfig} from "#imports";
import adm from '../assets/adm.svg'
import dish from '../assets/dish.svg'
const config = useRuntimeConfig();

function onClick(action) {
  if(action === 'ingredients-photo') {

  } else if (action === 'meal-photo') {

  } else if( action === 'social-media') {

  }
}

const props = defineProps<{ meal: Meal }>()

const meal = computed<Meal>(() => {
  return props.meal;
})

function photoUrl(meal: Meal): string {
  if (meal.attributes.meal_image?.data) {
    console.log(meal.attributes.meal_image);
    if (meal.attributes.meal_image.data.attributes.formats?.medium) {
      return `${config.public.baseUrl}${meal.attributes.meal_image.data.attributes.formats.medium.url}`;
    } else {
      return `${config.public.baseUrl}${meal.attributes.meal_image.data.attributes.url}`;
    }
  } else if (meal.attributes.ingredients_image?.data) {
    if (meal.attributes.ingredients_image.data.attributes.formats?.medium) {
      return `${config.public.baseUrl}${meal.attributes.ingredients_image.data.attributes.formats.medium.url}`;
    } else {
      return `${config.public.baseUrl}${meal.attributes.ingredients_image.data.attributes.url}`;
    }
  } else if (meal.attributes.recipe?.data && meal.attributes.recipe.data.attributes.photo) {
    if (meal.attributes.recipe.data.attributes.photo.data.attributes.formats?.medium) {
      return `${config.public.baseUrl}${meal.attributes.recipe.data.attributes.photo.data.attributes.formats.medium.url}`;
    } else {
      return `${config.public.baseUrl}${meal.attributes.recipe.data.attributes.photo.data.attributes.url}`;
    }
  } else {
    return 'https://place-hold.it/300';
  }
}
</script>

<style scoped>

</style>
