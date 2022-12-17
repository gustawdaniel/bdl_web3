<template>
  <div>


    <div>
      <div v-if="pending">
        Loading...
      </div>
      <div v-else-if="error">
        <pre>{{error}}</pre>
      </div>
      <div v-else>
        <h3 class="font-bold text-lg my-2">Total meals
          <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-bold text-red-800">{{data.meta.pagination.total}}</span>

          </h3>

        <div v-for="(meal) in data.data"
             :key="meal.id"
             class="my-2"
            >
          <MyMealCard :meal="meal"/>
        </div>

        <div v-if="data && data.meta.pagination.pageSize > 1">
          <button @click="prev">&lt;</button>
          <span>{{ page }}</span>
          <button @click="next">&gt;</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref, useCookie, useLazyFetch, useRuntimeConfig} from "#imports";
import MyMealCard from "~/components/MyMealCard.vue";

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
  'populate': 'recipe,ingredients_image,meal_image,recipe.photo',
  'sort': 'createdAt:desc'
})

const {
  data,
  pending,
  error,
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

<style scoped>

</style>
