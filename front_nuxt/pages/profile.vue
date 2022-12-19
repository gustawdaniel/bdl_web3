<script lang="ts" setup>
import {definePageMeta, useCookie, useRouter} from "#imports";
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
    picture:
        'https://s3-alpha-sig.figma.com/img/e058/8513/50dfe580c5e0fae05814a0b033967061?Expires=1672617600&Signature=Gf0iYqjVJNi7hBKfKb87bjSCXXVecFjkVF1oc9VX-2F5EbfQReEG5k8cx1JtKpdv1raTZ5j4GLqFDCoIZjJHSoSWD0jDrE8N3CJY~UBKEydHLAelnwyapOrsYRiYo5V3mfV9pTWqBsWcfT1Vr78zXLLL~HExaGrC9B~8G3IEIPqeQn1xfJ-Oq1u5nMX3SO-OXKTs3ypOQf0i3cAUYeaaLaBrNYvl9FU0Jb4yXNJVnvYAv~1v4KZ6XshaN5K5vID8qxvlKKjNtcmhMOxjSx605qDbem7512gmABkN4je1PKzToSdeGlfgdcYOBxsJghsCrML0CbAdYjJ3RulUineLlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  }, {
    title: 'Free jar in Coned',
    description: 'Nutella',
    value: 40,
    picture:
        'https://s3-alpha-sig.figma.com/img/58f6/0297/e948b4fc6a640aef6f94655d69a823c3?Expires=1672617600&Signature=ooibwmrf1~g-F6626PCzdrzuNRSb2rBUWHQl-vkVV9F9Ue46RFqvDj7M3Qqyvcis9ISYpY4U~~3nrYUYOQpCx0LRRHx7eD09MX0Vk6-GCp7SGXqHvqNRpMTeAp2jB9Lx70Y4iLlCjdrPo~PBHKr4LMUmU41EqDNovwM5j5PPBMMucWKnO84euhvzeAp2j-hHE0Ib2LrGhQuEkPojZSe8DbPZwY~rKttjsAI-POxMX2Qc~dC9rN10WgvspScV8pzVcxjekYiiIkv70nWZMc5Tvuw1XTIbRhkaLIC-6V-XdIaFxgskdLtYtmPr~blHNNMKVIA5cFDi~~5zqbDWnovPTQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  }, {
    title: '15% discount',
    description: 'Coca-cola & Esselunga',
    value: 40,
    picture:
        'https://s3-alpha-sig.figma.com/img/533b/7295/e9a5720e36cda9d5facb2b4807c6e6bf?Expires=1672617600&Signature=TBNTN8~35mlq~qElL1AEkLyKS6STtNdvCL0jM5W2YHpkKQkl5Qf3Zx0S5-NDe8-uA77icwNpnEtu2R6c8XglrtOEEBtv0PwrrOo-Ls0xcZS6Yd1jl4mllPlkzl6EhwwX682A7Xatz1F4Rw3mmuio0E9ZSVbyVn8VTs-5X8jhYo4MYKS1uguNIIypJ5~PgvhXeH9JiO4~edEr0S5PLWNjh4N9WX7laGY5oVLiX51CF3uiN3v1t6gFMlXYtOMDst7A7UvhRPCAsps2kteGulz7VKeg96Quq5z4z0-2RN5vc1WdDktN2vrPJ0qI8Knsg1BgGEYQ61Jk6rh0SmSqD47cJg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  }, {
    title: 'Free master-class',
    description: 'Heinz',
    value: 40,
    picture:
        'https://s3-alpha-sig.figma.com/img/087a/08fc/179af0cd48d5ba34f3758a84215d35b1?Expires=1672617600&Signature=KvY-Ir5JLDssp1XDRMkibFJ7BY4UzkNsoUPSLf0~-8svamyVZu2gSC3V08JvGDE3UajX8fHulgDUN4p2JDo5n9pBi2KdI94o3Nc~Essrh8LUk83Ly5irbtWTgM095YfMhkZtcb6xeUBH8XBVA9RLyD9MBOw11RSY5eBEcGo9fJn0GCObty4KKeQeOp55TvkYVSqIGGo6s-Vy-057r1Pz3Tl7aptVjabmw7JKdh0-ixaG9Ljqa9d5Sz-9RrrZ8L0Xjxs4065TfgL5T3XDMeAjRpbiDHkuOmRust2ZjvwccGbzdi5Ui4PJmdKnfIm1lfx8WoifTyAAPbo1SglMFty8Rg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
</script>

<template>
  <div v-if="user">
    <header class="bg-gradient-to-br from-purple-400 to-indigo-800 rounded-b-3xl p-5 text-white">
      <section class="flex items-center mb-6">
        <img src="/hacker-avatar-512x512.png" alt="Avatar" class="h-12 w-12 mr-4">
        <div>
          <h1 class="font-semibold text-base">Hello, Jane</h1>
          <p class="text-xs">{{ user?.email }}</p>
        </div>
      </section>
      <section class="text-xs mb-3">
        <p class="mb-1">Wallet, ADM</p>
        <p class="flex items-center">
          <span class="mr-2">X0Y1djUFD...cvIFUE230423</span>
          <Square2StackIcon class="h-4 w-4"/>
        </p>
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
