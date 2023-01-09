<script lang="ts" setup>
import dish from '../../assets/dish.svg';
import pepper from '../../assets/img/pepper.svg';

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
</template>
