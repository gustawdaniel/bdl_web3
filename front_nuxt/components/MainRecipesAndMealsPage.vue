<template>
  <div class="m-4">
    <header class="flex justify-between items-center">
      <h1 class="font-bold text-3xl">{{isRecipes ? 'Recipes' : 'My Meals'}}</h1>
      <div class="flex">
        <component :is="MagnifyingGlassIcon" class="mr-3 flex-shrink-0 h-6 w-6"/>
        <component :is="RectangleStackIcon" class="mr-3 flex-shrink-0 h-6 w-6"/>
      </div>
    </header>

    <div>

      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <span v-for="tab in tabs" :key="tab.to" @click="setView(tab.to)" :class="[
                tab.current ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm w-full text-center font-semibold'
                ]" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</span>
        </nav>
      </div>
    </div>

    <main>
      <div :key="tab.to" v-for="tab in tabs.filter(t => t.current)">
        <component :is="tab.component"/>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  page: 'recipes' | 'meals'
}>()



const isRecipes = props.page == 'recipes';
const isMeals = !isRecipes;

import { ref, useRouter} from "#imports";
import {
  MagnifyingGlassIcon,
  RectangleStackIcon
} from '@heroicons/vue/24/outline'
import {DiscoverRecipes, MyMeals} from "#components";

const router = useRouter();

const tabs = ref([
  { name: 'Discover', to: 'discover', current: isRecipes, component: DiscoverRecipes },
  { name: 'My meals', to: 'my-meals', current: isMeals, component: MyMeals },
])



function setView(to) {
  if(to === 'discover') {
    router.push('/recipes');
  } else if(to === 'my-meals') {
    router.push('/meals')
  }


  // if(tabs.value.map((nav) => nav.to).includes(to)) {
  //   const old = tabs.value.find((nav) => nav.current);
  //   if (old) {
  //     old.current = false;
  //   }
  //   const current = tabs.value.find(nav => nav.to.includes(to));
  //   if (current) {
  //     current.current = true;
  //   }
  // }
}

// TODO: remove this
// setView('my-meals');
</script>

<style scoped>

</style>
