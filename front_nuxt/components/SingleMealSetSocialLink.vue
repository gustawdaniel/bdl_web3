<script lang="ts" setup>

import {ref, useCookie, useLazyFetch, useRuntimeConfig, watch} from "#imports";
import {Meal} from "~/helpers/api";

const props = defineProps<{
  meal: Meal
}>()
const config = useRuntimeConfig();
const token = useCookie('token')
const linkForm = ref<string>(props.meal.attributes.social_media_post ?? '');
const linkBody = ref<{ data: { social_media_post: string } }>({data: {social_media_post: props.meal.attributes.social_media_post ?? ''}});


const {data} = await useLazyFetch(`${config.public.baseUrl}/api/meals/${props.meal.id}`, {
  method: 'put',
  body: linkBody,
  immediate: false,
  headers: {
    Authorization: `Bearer ${token.value}`
  },
})

function setLink() {
  linkBody.value = {
    data: {
      social_media_post: linkForm.value
    }
  }
}

const emit = defineEmits(['reload'])
import dish from '../assets/dish.svg';
import pepper from '../assets/img/pepper.svg';

watch(data, () => {
  emit('reload')
});

const rules = [
  {
    medium: 'Instagram', rewards: [
      {value: 100, text: 'Photo with the link to recipe in Stories per 1000 active users.'},
      {value: 200, text: 'Video with the link to recipe in Stories per 1000 active users.'},
      {value: 10, text: 'Reels per 1000 views in 24 hours.'}]
  },
  {
    medium: 'TikTok', rewards: [
      {value: 10, text: 'Video per 1000 views in 24 hours.'}]
  }
];

const advices = [
  'Make sure your account is public.',
  'Send the link to the piece of content and wait for ADM tokens accrual in 24 hours.',
  'Make sure your account is public',
  'Send the link to the piece of content and wait for ADM tokens accrual in 24 hours',
];

</script>

<template>
  <div class="m-4">
    <section class="shadow-xl shadow-red-500/50 mb-6 rounded-3xl p-8">
      <h1 class="text-xl font-bold">Share the result in social media and get ADM tokens</h1>

      <div :key="index" v-for="(rule, index) in rules">
        <h2 class="text-base font-bold text-slate-500 mt-6">{{ rule.medium }}</h2>

        <div :key="index" v-for="(reward, index) in rule.rewards">
          <span class="flex justify-start items-center mt-3">
            <span class="mr-1 text-lg font-bold">{{ reward.value }}</span>
            <img class="h-5 w-5" :src="dish" alt="DISC">
          </span>

          <p class="text-sm text-gray-500">{{ reward.text }}</p>
        </div>
      </div>

      <ul>
        <li v-for="advice in advices" class="flex items-top my-3">
          <img class="h-5 w-5 mr-2" :src="pepper" alt="pepper">

          <span class="text-sm text-gray-500">{{ advice }}</span>
        </li>
      </ul>

    </section>

    <form @submit.prevent="setLink" class="text-center">
      <input type="text" v-model.lazy.trim="linkForm"
             class="rounded-full p-2 text-center mb-10 border w-full border-red-200"
             placeholder="https://instagram.com/">
      <button type="submit"
              class="

          w-52 justify-center inline-flex items-center rounded-full border border-transparent bg-red-500 px-3 py-3
             text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
             focus:ring-offset-2 font-bold uppercase shadow-xl mb-8" @click="emit('next')">
        Send the link
      </button>
    </form>
  </div>
</template>

<style scoped></style>
