<script lang="ts" setup>
import {ref, useCookie, useLazyFetch, useRoute, useRuntimeConfig, watch} from "#imports";
import {Meal} from "~/helpers/api";

const route = useRoute()
const config = useRuntimeConfig();
const token = useCookie('token')


const screen = ref<number>(0);

function prev() {
  if (screen.value > 0) screen.value--;
}

function next() {
  if (screen.value < 8) screen.value++;
}

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
})


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

    <SingleMealCard v-if="screen === 0" :meal="data.data" @next="next"/>
    <MealExcellentChoice v-if="screen === 1" :meal="data.data" @prev="prev"/>
    <SingleMealUploadImage v-if="screen === 2" :meal="data.data"  imageKey="ingredients_image"/>
    <SingleMealSuccess
        v-if="screen === 3"
        title="Great"
        description="Now you can start cooking.

Can't wait to see the result!"
    />
    <SingleMealCard v-if="screen === 4" :meal="data.data"/>
    <SingleMealUploadImage v-if="screen === 5" :meal="data.data"  imageKey="meal_image"/>
    <SingleMealSuccess
        v-if="screen === 6"
        title="Looks delicious!"
        description="The reward for cooking is already in your Wallet.

Check it and enjoy your meal!"
    />
    <SingleMealSetSocialLink v-if="screen === 7" :meal="data.data" @reload="execute"/>
    <SingleMealSuccess
        v-if="screen === 8"
        title="Have a great day!"
        description="You can see history of your meals."
        :showHistory="true"
    />


    <hr>
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped></style>
