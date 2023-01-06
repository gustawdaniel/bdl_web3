<template>

  <table class="min-w-full divide-y divide-gray-300">
    <tbody class="divide-y divide-gray-200 bg-white">
    <tr v-for="ingredient in recipe.ingredients" :key="ingredient.id">
      <td class="whitespace-nowrap py-4 pr-3 text-xs font-medium text-gray-600 ">{{ ingredient.name }}</td>
      <td class="whitespace-nowrap px-3 py-4 text-xs text-right font-semibold text-gray-800">{{ ingredient.value }} {{ingredient.unit}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import {RecipeAttributes} from "~/helpers/api";

const props = defineProps<{recipe: RecipeAttributes}>()
</script>

<style scoped>

</style>
