<template>
  <MainRecipesAndMealsPage page="recipes"/>
</template>

<script setup lang="ts">
import MainRecipesAndMealsPage from "~/components/MainRecipesAndMealsPage.vue";
import {definePageMeta} from "#imports";
definePageMeta({
  layout: 'panel'
})
</script>

<style scoped>

</style>
