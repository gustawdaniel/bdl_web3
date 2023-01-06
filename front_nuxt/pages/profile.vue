<script lang="ts" setup>
import {definePageMeta, ref, useCookie, useRouter} from "#imports";
import {User} from "~/helpers/api";
import {CookieRef} from "#app";

const user: CookieRef<User> = useCookie('user');
const token = useCookie('token');
const router = useRouter();

if (!user.value) {
  router.push('/login');
}

definePageMeta({
  layout: 'panel'
})
import adm from '../assets/adm.svg';
import admInverse from '../assets/adm-inverse.svg';
import dish from '../assets/dish.svg';

import {
  Square2StackIcon,
  ArrowUpRightIcon,
  ArrowSmallDownIcon
} from '@heroicons/vue/24/outline';

const nftList = [
  {
    title: '10% discount',
    description: 'Barilla',
    value: 40,
    picture: '/nft/n1.jpeg',
  }, {
    title: 'Free jar in Coned',
    description: 'Nutella',
    value: 40,
    picture: '/nft/n2-min.png',
  }, {
    title: '15% discount',
    description: 'Coca-cola & Esselunga',
    value: 40,
    picture: '/nft/n3-min.png',
  }, {
    title: 'Free master-class',
    description: 'Heinz',
    value: 40,
    picture: '/nft/n4-min.png',
  },
]

const tokens = [
  {
    picture: dish,
    name: 'dish',
    value: 115.00
  },
  {
    picture: adm,
    name: 'adm',
    value: 1125.00
  },
]

function formatBigNumber(number:number): string {
  return (number).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

const copiedNotification = ref<boolean>(false)

function copyAddress() {
  navigator.clipboard.writeText(user.value?.wallet_address ?? '');
  copiedNotification.value = true;
  setTimeout(() => {
    copiedNotification.value = false
  }, 3000);
}
</script>

<template>
  <div v-if="user">
    <header class="bg-gradient-to-br from-purple-400 to-indigo-800 rounded-b-3xl p-5 text-white">
      <section class="flex items-center mb-6">
        <img src="/hacker-avatar-512x512.png" alt="Avatar" class="h-12 w-12 mr-4">
        <div>
          <h1 class="font-semibold text-base">Hello, {{ user?.first_name || 'User' }}</h1>
          <p class="text-xs">{{ user?.email }}</p>
        </div>
      </section>
      <section class="text-xs mb-3" v-if="user?.wallet_address">
        <p class="mb-1"><span class="capitalize">{{user?.wallet_type}}</span> Wallet, ADM</p>
        <p class="flex items-center cursor-pointer" @click="copyAddress">
          <span :class="['mr-2', copiedNotification ? 'text-gray-200' : '']">{{user?.wallet_address.substring(0,8)}}...{{user?.wallet_address.substring(32)}}</span>
          <Square2StackIcon class="h-4 w-4"/>
          <span v-if="copiedNotification" class="ml-2">Copied!</span>
        </p>
      </section>
      <section v-else-if="!user?.wallet_address">
        <NuxtLink to="/connect-wallet">
          <button type="button"
                  class="inline-flex items-center rounded-full border border-transparent
                  bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm
                  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
                  focus:ring-offset-2 mb-5">
            Connect Wallet
          </button>
        </NuxtLink>
      </section>
      <section class="mb-8">
        <p class="flex items-center">
          <span class="mr-2">
            <img class="h-5 w-5" :src="admInverse" alt="adm">
          </span>
          <span class="font-bold text-3xl mr-4">
            1,125.00
          </span>
          <span
              class="inline-flex items-center rounded-full bg-lime-400 px-3 py-0.5 text-sm text-black font-bold">
            +40%
          </span>
        </p>
      </section>
      <section class="flex">
        <div class="mr-10">
          <div class="flex">
            <div class="bg-black bg-opacity-40 p-4 rounded-full">
              <ArrowUpRightIcon class="h-3 w-3"/>
            </div>
          </div>
          <span class="text-xs">Send</span>
        </div>
        <div class="mb-5">
          <div class="flex">
            <div class="bg-black bg-opacity-40 p-4 rounded-full">
              <ArrowSmallDownIcon class="h-3 w-3"/>
            </div>
          </div>
          <span class="text-xs">Receive</span>
        </div>
      </section>
    </header>
    <main class="p-5">
      <section class="mb-6">
        <h3 class="font-semibold text-base mb-3">Tokens</h3>
        <div class="flex justify-between border rounded-xl mb-2 p-4 shadow-md" v-for="(token, index) in tokens" :key="index" >
          <div class="flex items-center">
            <img class="h-5 w-5 mr-4" :src="token.picture" :alt="token.name">
            <span class="uppercase text-sm font-semibold">{{ token.name }}</span>
          </div>
          <span class="text-sm font-semibold">{{ formatBigNumber(token.value) }}</span>
        </div>

      </section>
      <section>
        <h3 class="font-semibold text-base mb-3">NFTs</h3>

        <div class="grid gap-4 grid-cols-2">
          <div v-for="(nft, index) in nftList" :key="index">
            <div class="flex-shrink-0 relative mb-3">
              <img class="w-full aspect-square	object-cover	object-top	 rounded-xl" :src="nft.picture" alt=""/>
              <p class="flex items-center absolute top-2 right-2 bg-white py-1 px-2 rounded-full">
                <span class="mr-1 text-xs font-bold">{{ nft.value }}</span>
                <img class="h-3.5 w-3.5" :src="adm" alt="ADM">
              </p>
            </div>
            <p class="text-sm font-semibold text-gray-900 mb-1">{{ nft.title }}</p>
            <p class="truncate text-xs text-gray-500">{{ nft.description }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
