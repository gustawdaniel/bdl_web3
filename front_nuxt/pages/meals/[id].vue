<script lang="ts" setup>
import {ref, useCookie, useLazyFetch, useRoute, useRuntimeConfig, watch} from "#imports";

const route = useRoute()
const config = useRuntimeConfig();
const token = useCookie('token')


const screen = ref<number>(0);

function prev() {
  if (screen.value > 0) screen.value--;
}

function next() {
  if (screen.value < 7) screen.value++;
}

const {
  data,
  pending,
  execute
} = await useLazyFetch(`${config.public.baseUrl}/api/meals/${route.params.id}?populate=recipe,ingredients_image,meal_image`, {
  immediate: true,
  headers: {
    Authorization: `Bearer ${token.value}`
  },
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

    <SingleMealCard v-if="screen === 0" :data="data"/>
    <SingleMealUploadImage v-if="screen === 1" :data="data" @reload="execute" imageKey="ingredients_image"/>
    <SingleMealSuccess
        v-if="screen === 2"
        title="Great"
        description="Now you can start cooking.

Can't wait to see the result!"
    />
    <SingleMealCard v-if="screen === 3" :data="data"/>
    <SingleMealUploadImage v-if="screen === 4" :data="data" @reload="execute" imageKey="meal_image"/>
    <SingleMealSuccess
        v-if="screen === 5"
        title="Looks delicious!"
        description="The reward for cooking is already in your Wallet.

Check it and enjoy your meal!"
    />
    <SingleMealSetSocialLink v-if="screen === 6" :data="data" @reload="execute"/>
    <SingleMealSuccess
        v-if="screen === 7"
        title="Have a great day!"
        description="You can see history of your meals."
        :showHistory="true"
    />


    <hr>
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped></style>
