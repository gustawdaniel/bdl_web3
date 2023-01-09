<script lang="ts" setup>
import SocialLinkRules from "~/components/meal/SocialLinkRules.vue";
import {Meal} from "~/helpers/api";
import adm from '../assets/adm.svg'

const props = defineProps<{
  meal: Meal
  title: string,
  description: string,
  showHistory?: boolean
}>()
</script>

<template>
  <div class="m-4">
    <SocialLinkRules/>

    <div v-if="props.meal.attributes.status === 'review'" class="text-center m-auto">

      <img class="w-32 h-32 mx-auto mt-12" src="/sand-clock-timer.gif" alt="sand-clock-timer">

      <h1 class="text-sm font-semibold mb-3">Thanks for sharing!</h1>
      <p class="text-sm font-normal">
        We’ll check the link and accrual ADM tokens in 24 hours.
      </p>

    </div>
    <div v-else class="text-center m-auto">
      <div class="bg-white rounded-3xl p-8">
        <h1 class="text-sm font-semibold mb-3">Congratulations!</h1>
        <p class="text-sm font-normal">
          You earned
        </p>

        <p class="flex justify-center items-center select-none mb-3">
          <span class="text-base font-bold mr-1">{{ 100 }}</span>
          <img class="h-4 w-4" :src="adm" alt="ADM">
        </p>

        <p class="text-sm font-normal">Keep cooking and earn more tokens.</p>

        <nuxt-link
            v-if="props.showHistory"
            to="/meals"
        >
          <button>Show my meals</button>
        </nuxt-link>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
