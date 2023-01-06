<script lang="ts" setup>
import {Meal, Recipe, RecipeAttributes, recipeImageUrl} from "~/helpers/api";
import {computed, ref, useRuntimeConfig} from "#imports";

const config = useRuntimeConfig();


const props = defineProps<{
  recipe: RecipeAttributes
  buttonTitle: string
}>()

const imageUrl = computed<string>(() => {
  return props.recipe ? recipeImageUrl(props.recipe, config) : '';
})

const recipe = computed<RecipeAttributes>(() => {
  if (!props.recipe) throw new Error(`No recipe`);
  return props.recipe;
});

import dish from '../assets/dish.svg';
import {
  ClockIcon,
  CakeIcon
} from '@heroicons/vue/24/outline'

const colors = [
  'bg-gray-100 text-gray-800',
  'bg-red-100 text-red-800',
  'bg-yellow-100 text-yellow-800',
  'bg-green-100 text-green-800',
  'bg-blue-100 text-blue-800',
  'bg-indigo-100 text-indigo-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800'
];

import {MealMyMealCardIngredients, MealMyMealCardInstruction, MealMyMealCardGetTokens} from "#components";

const tabs = ref([
  {name: 'Ingredients', to: 'ingredients', current: true, component: MealMyMealCardIngredients},
  {name: 'Instruction', to: 'instruction', current: false, component: MealMyMealCardInstruction},
  {name: 'Get tokens', to: 'get-tokens', current: false, component: MealMyMealCardGetTokens},
]);

function selectTab(to) {
  if (tabs.value.map((nav) => nav.to).includes(to)) {
    const old = tabs.value.find((nav) => nav.current);
    if (old) {
      old.current = false;
    }
    const current = tabs.value.find(nav => nav.to.includes(to));
    if (current) {
      current.current = true;
    }
  }
}

const emit = defineEmits(['next']);

function emitNext() {
  emit('next')
}

</script>

<template>
  <div>
    <aside class="h-72 w-full  bg-center bg-cover" :style="{
      backgroundImage: 'url(' + imageUrl + ')'
    }">
    </aside>
    <main class="rounded-3xl p-5 -mt-6 bg-white">
      <header class="flex justify-between mb-3">
        <h1 class="text-2xl font-bold">{{ recipe.name }}</h1>

        <span class="flex items-end">
          <span class="mr-2 text-xs text-slate-500 mb-1">Total:</span>
          <span class="flex items-center">
            <span class="text-2xl font-bold mr-1">{{ recipe.dish_reward_for_cooking }}</span>
            <img class="h-5 w-5" :src="dish" alt="DISC">
          </span>
        </span>
      </header>

      <div class="mb-4" v-if="recipe.short_description">
        <p class="text-xs text-slate-600">
          {{ recipe.short_description }}
        </p>
      </div>

      <div class="flex text-xs -mr-5">
        <div class="border p-4 shadow-xl rounded-xl mr-4">
          <p class="text-gray-600 mb-2">About</p>
          <p class="flex  mb-2 items-center">
            <ClockIcon class="w-4 h-4 m-1  mr-2"/>
            <span class="font-bold mr-2">{{ recipe.cooking_time_value }} {{ recipe.cooking_time_unit }}</span>
          </p>
          <div class="flex  items-center">
            <CakeIcon class="w-4 h-4 m-1 mr-2"/>
            <p class="font-bold mr-2 whitespace-nowrap">{{ recipe.servings }} servings</p>
          </div>
        </div>
        <div class="border p-4  shadow-xl rounded-l-xl 	">
          <p class="text-xs text-gray-600 mb-2">Nutrition estimate:</p>
          <div class="h-14 -mr-4 overflow-hidden">

            <div :key="nutrition.id" v-for="(nutrition, index) in recipe.nutrition"
                 class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 mr-2"
                 :class="colors[index % colors.length]">
              <span class="mr-1 capitalize">{{
                  nutrition.name
                }}: </span><span>{{ nutrition.value }}{{ nutrition.unit }}</span>
            </div>


          </div>
        </div>
      </div>

      <div>
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8 flex justify-between" aria-label="Tabs">
            <button
                @click="selectTab(tab.to)"
                v-for="tab in tabs" :key="tab.to" :class="[
                tab.current ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                 'whitespace-nowrap py-4 px-1 border-b-2 text-center font-medium text-sm'
                 ]"
                :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}
            </button>
          </nav>
        </div>

        <div>
          <component :is="tab.component" v-bind="{recipe}" v-for="tab in tabs.filter(t => t.current)" :key="tab.to"/>
        </div>
      </div>

      <div>
        <button type="button" class="
        w-full justify-center inline-flex items-center rounded-full border border-transparent bg-red-500 px-3 py-4
           text-base text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
           focus:ring-offset-2 font-bold uppercase shadow-xl" @click="emitNext">
            {{ props.buttonTitle || 'Let\'s cook it' }}
        </button>
      </div>
    </main>

  </div>
</template>

<style scoped></style>
