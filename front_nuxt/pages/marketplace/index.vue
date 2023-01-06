<template>
  <div class="p-5">

    <section class="bg-pink-100 rounded-2xl flex justify-between mb-8">
      <div class="my-5 mx-3">
        <h2 class="text-lg font-semibold">New Smart Kettle</h2>
        <p class="text-xs text-slate-500 mb-5">New functionality in a modern light-pink cover.</p>
        <NuxtLink to="/marketplace/1">
          <button type="button"
                  class="inline-flex items-center rounded-full border border-transparent bg-red-500 px-3.5 py-2 text-sm font-bold leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
            Buy now
          </button>
        </NuxtLink>

      </div>
      <div>
        <!--        <img class="w-32 h-32 aspect-square" src="/smeg.png" alt="smeg">-->
        <div class="h-32 w-32 m-3  flex flex-col justify-between bg-center bg-cover rounded-2xl"
             :style="{ backgroundImage: 'url(' + '/smeg.png' + ')' }"></div>

      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-3.5">Popular category</h2>

      <div class="mb-5">

        <nav class="flex" aria-label="Tabs">
          <button v-for="tab in navigation" :key="tab.name" :class="[
                tab.current ? 'bg-red-100 text-red-700 font-medium' : 'text-red-500 hover:text-red-700',
                'p-2.5 font-medium text-xs leading-3 tracking-wide rounded-md'
                ]" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}
          </button>
        </nav>
      </div>

      <div>
        <div v-for="(product, index) in products" :key="index"
             class="shadow-lg mb-5 rounded-xl relative flex p-2.5 border border-gray-100">
          <div class="mr-2 relative">
            <img class="h-24 w-24 rounded-xl aspect-square" :src="product.image" :alt="product.name"
                 :style="`background: ${product.bgColor}`">
            <span class="absolute inline-flex items-center rounded-full bg-opacity-50 bg-lime-600 px-3 py-0.5
            text-sm font-bold text-white -right-6 -bottom-3">
              {{ product.percent }}%
            </span>

          </div>
          <div class="flex flex-col justify-between w-full">
            <div>
              <h3 class="font-semibold mb-px">{{ product.name }}</h3>
              <p class="text-xs text-gray-500 mr-10">{{ product.desc }}</p>
            </div>

            <div class="top-2.5 right-2.5 absolute shadow-md rounded cursor-pointer" @click="toggleLike(product)">
              <component
                  :is="product.liked ? FullHeartIcon : OutlineHeartIcon"
                  class="h-4 w-4 text-red-500  m-1.5"/>
            </div>

            <p class="flex justify-end items-center select-none">
              <span class="text-base font-bold mr-1">{{ product.dish }}</span>
              <img class="h-4 w-4" :src="dish" alt="DISH">
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {definePageMeta, ref} from "#imports";
import dish from '../../assets/dish.svg'

definePageMeta({
  layout: 'panel'
})

const navigation = [
  {name: 'All', current: true},
  {name: 'coffee machine', current: false},
  {name: 'headphones', current: false},
  {name: 'smart watch', current: false}
];

interface Product {
  image: string,
  name: string,
  desc: string,
  percent: number,
  dish: number,
  liked: boolean,
  bgColor: string
}

import {HeartIcon as OutlineHeartIcon} from '@heroicons/vue/24/outline'
import {HeartIcon as FullHeartIcon} from '@heroicons/vue/24/solid'
import {Ref} from "@vue/reactivity";

function toggleLike(product: Product) {
  product.liked = !product.liked;
}

const products: Ref<Array<Product>> = ref([
  {
    image: '/marketplace-product-1.png',
    name: 'JURA coffee machines',
    desc: 'New functionality in a modern light-pink cover.',
    percent: 20,
    dish: 300,
    liked: false,
    bgColor: 'rgba(222,241,237,0.5)'
  },
  {
    image: '/marketplace-product-2.png',
    name: 'JBL T450 Headphones',
    desc: 'New functionality in a modern light-pink cover.',
    percent: 10,
    dish: 300,
    liked: false,
    bgColor: 'rgba(205,231,255,0.5)'
  },
  {
    image: '/marketplace-product-3.png',
    name: 'SMEG Fridge',
    desc: 'New functionality in a modern light-pink cover.',
    percent: 20,
    dish: 300,
    liked: false,
    bgColor: 'rgba(243,98,88,0.2)'
  }
])
</script>
