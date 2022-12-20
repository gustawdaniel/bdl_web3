<script lang="ts" setup>
import {onMounted, ref, useCookie, useLazyFetch, useRoute, useRouter, useRuntimeConfig, watch} from "#imports";
import {Meal} from "~/helpers/api";
import {RouteLocationNormalizedLoaded} from "vue-router";

const route = useRoute()
const config = useRuntimeConfig();
const token = useCookie('token')


const screen = ref<number>(1);


function prev() {
  if (screen.value > 0) screen.value--;
}

function next() {
  if (screen.value < 7) screen.value++;
}

function setScreenUsingQuery(route: RouteLocationNormalizedLoaded):void {
  if('action' in route.query) {
    switch (route.query.action) {
      case 'ingredients-photo': {
        screen.value = 2;
        break;
      }
      case 'meal-photo': {
        screen.value = 5;
        break;
      }
      case 'social-media': {
        screen.value = 7;
        break;
      }
    }
    console.log("r.query.action", route.query.action);
  }
}

onMounted(() => {
  setScreenUsingQuery(route);
})

watch(route, (r) => {
  console.log(r.query);
  setScreenUsingQuery(r);
})

const {
  data,
  pending,
  execute
} = await useLazyFetch<{data: Meal}>(`${config.public.baseUrl}/api/meals/${route.params.id}`, {
  immediate: true,
  headers: {
    Authorization: `Bearer ${token.value}`
  },
  query: {
    populate: 'recipe,ingredients_image,meal_image,recipe.photo,recipe.nutrition,recipe.ingredients'
  }
});

const router = useRouter();

function finish() {
  console.log("finish");
  router.push('/meals')
}
</script>

<template>
  <div>
    <NuxtLink :to="`/recipes`">
      <button>Recipes</button>
    </NuxtLink>
    <NuxtLink v-if="data" :to="`/recipes/${data.data.attributes.recipe.data.id}`">
      <button>This Recipe</button>
    </NuxtLink>

    Meal: {{ route.params.id }}
  </div>

  <div v-if="pending">
    Loading...
  </div>
  <div v-else>
    <hr>
    <div>
      <button @click="prev">Prev</button>
      <span>{{ screen }}</span>
      <button @click="next">Next</button>
    </div>

    <SingleRecipeCard v-if="screen === 0" :recipe="data.data.attributes.recipe.data.attributes" @next="next"/>
    <MealExcellentChoice v-if="screen === 1" :meal="data.data" @prev="prev"/>
    <SingleMealUploadImage v-if="screen === 2" :meal="data.data"
                           @reload="execute"
                           @prev="prev"
                           @next="next"
                           imageKey="ingredients_image"/>

    <SingleRecipeCard v-if="screen === 3" :recipe="data.data.attributes.recipe.data.attributes" button-title="progresss" @next="next"/>
    <MealExcellentChoice v-if="screen === 4" :meal="data.data" @prev="prev"/>

    <SingleMealUploadImage v-if="screen === 5" :meal="data.data"
                           @reload="execute"
                           @prev="prev"
                           @next="next"
                           imageKey="meal_image"/>

    <SingleMealSetSocialLink v-if="screen === 6" :meal="data.data" @reload="execute" @next="next"/>
    <SingleMealSuccess
        v-if="screen === 7"
        title="Have a great day!"
        description="You can see history of your meals."
        :showHistory="true"
        @next="finish"
    />


    <hr>
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped></style>
