<script lang="ts" setup>
import {ref, useCookie, useLazyFetch, useRuntimeConfig} from "#imports";

const config = useRuntimeConfig();
const token = useCookie('token')

interface SearchParameters {
  [key: string]: any;
}

const pageSize = ref<number>(6)
const page = ref<number>(1)
const query = ref<SearchParameters>({
  'pagination[pageSize]': pageSize.value,
  'pagination[page]': page.value,
  'populate': 'recipe,ingredients_image,meal_image',
  'sort': 'createdAt:desc'
})

const {
  data,
  pending,
  execute
} = await useLazyFetch(`${config.public.baseUrl}/api/meals`, {
  headers: {
    Authorization: `Bearer ${token.value}`
  },
  immediate: true,
  query: query.value
})

function prev() {
  if (page.value > 1) {
    page.value--;
    query.value['pagination[page]'] =  page.value;
  }
}

function next() {
  console.log("data.meta.pagination.pageSize", pending);
  if (!pending.value && page.value < data.value.meta.pagination.pageCount) {
    page.value++;
    query.value['pagination[page]'] =  page.value;
  }
}
</script>

<template>
  <div>
    Page: Meals

    <div v-if="pending">
      Loading...
    </div>
    <div v-else>

      <div v-for="(meal, index) in data.data"
           :key="meal.id"
           style="border: 1px solid black; margin: 5px; padding: 5px;">
        <p>[{{ meal.id }}] {{ meal.attributes.name }}</p>
        <p>url: {{ meal.attributes.social_media_post }}</p>

        <div>
          <img
              v-if="meal.attributes['ingredients_image'].data && meal.attributes['ingredients_image'].data.attributes.formats"
              :src="`${config.public.baseUrl}${meal.attributes['ingredients_image'].data.attributes.formats.thumbnail.url}`"
              alt="">
          <img
              v-if="meal.attributes['meal_image'].data && meal.attributes['meal_image'].data.attributes.formats"
              :src="`${config.public.baseUrl}${meal.attributes['meal_image'].data.attributes.formats.thumbnail.url}`"
              alt="">
        </div>

        <p>dish: {{ meal.attributes.dish_token ?? 0 }}</p>
        <p>adm: {{ meal.attributes.adm_token ?? 0 }}</p>
        <p>[{{ index }}] {{ meal.attributes.createdAt }}</p>

        <nuxt-link :to="`/meals/${meal.id}`"><button>See Meal</button></nuxt-link>
        <nuxt-link :to="`/recipes/${meal.attributes.recipe.data.id}`"><button>See Recipe</button></nuxt-link>
        <nuxt-link :to="`/recipes`"><button>All Recipes</button></nuxt-link>
      </div>

      <div v-if="data && data.meta.pagination.pageSize > 1">
        <button @click="prev">&lt;</button>
        <span>{{ page }}</span>
        <button @click="next">&gt;</button>
      </div>

      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<style scoped></style>
