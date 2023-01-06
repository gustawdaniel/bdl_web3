<template>
  <p class="text-gray-600 text-xs py-4 leading-6">{{props.recipe.instruction ?? 'Instruction not provided for this recipe...'}}</p>
</template>

<script setup lang="ts">
import {RecipeAttributes} from "~/helpers/api";

const props = defineProps<{recipe: RecipeAttributes}>()

</script>

<style scoped>

</style>
