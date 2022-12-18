<template>
  <div class="p-5">
    <nav class="flex mb-10">
      <ChevronLeftIcon @click="emitPrev" class="h-6 w-6 mr-2 cursor-pointer"/>
      <span>Back</span>
    </nav>
    <header class="text-center mb-14">
      <h1 class="text-2xl font-bold mb-3">Excellent choice!</h1>
      <p class="text-gray-600">Now follow the <span class="font-semibold">steps to get tokens</span> and track your progress.</p>
    </header>
    <section class="text-center mb-14" v-for="section in sections" :key="section.action">

      <img class="m-auto mb-3" :src="section.image" :alt="section.text">
      <p class="mb-8 text-lg font-semibold">{{section.text}}</p>
        <button type="button" class="
        inline-flex items-center rounded-full border border-transparent
        py-3
        flex justify-center
         w-52 shadow-lg
           text-xs  shadow-sm  focus:outline-none focus:ring-2
           focus:ring-offset-2 font-bold"
            :class="section.active.value ?
             'bg-red-500 focus:ring-red-500 hover:bg-red-700 text-white shadow-red-500/50' : 'shadow-gray-500/50 bg-gray-200 text-gray-400 cursor-not-allowed'"
                @click="section.active.value ? onClick(section.action) : () => {}"
                :disabled="section.action.value"
        >Ready</button>
    </section>

  </div>
</template>

<script setup lang="ts">
import photoIngredients from '../../assets/img/excellent-photo-ingredients.svg'
import photoMeal from '../../assets/img/excellent-photo-meal.svg'
import photoSocial from '../../assets/img/excellent-social-media-link.svg'
import {
  ChevronLeftIcon,
} from '@heroicons/vue/24/outline'
import {Meal} from "~/helpers/api";
import {computed, useRouter} from "#imports";



const props = defineProps<{
  meal: Meal
}>()
const router = useRouter();

function onClick(action) {
  router.push(`/meals/${props.meal.id}?action=${action}`);
}

const isIngredientsActive = computed<boolean>(() => {
  return true;
})

const isMealActive = computed<boolean>(() => {
  return Boolean(props.meal.attributes.ingredients_image?.data)
})

const isSocialActive = computed<boolean>(() => {
  return isMealActive.value && Boolean(props.meal.attributes.meal_image?.data) // !props.meal.attributes.social_media_post)
})

const sections = [
  {image: photoIngredients, text: 'Take a photo of ingredients', action: 'ingredients-photo', active: isIngredientsActive},
  {image: photoMeal, text: 'Take a photo of prepared dish', action: 'meal-photo', active: isMealActive},
  {image: photoSocial, text: 'Share the result on social media and get ADM tokens', action: 'social-media', active: isSocialActive}
]

const emit = defineEmits(['prev']);

function emitPrev() {
  emit('prev');
}
</script>

<style scoped>

</style>
