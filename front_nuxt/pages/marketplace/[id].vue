<template>
  <div>
    <div class="px-5">
      <nav class="flex mb-10 cursor-pointer" @click="back">
        <ChevronLeftIcon  class="h-6 w-6 mr-2 cursor-pointer"/>
        <span>Back</span>
      </nav>
    </div>
    <h1 class="text-2xl font-bold text-center my-5">Successful purchace!</h1>
    <div class="bg-pink-50 pb-3.5 pt-20 mb-1">
      <img src="/smeg.png" alt="smag">
    </div>
    <main class="p-5" v-if="!bought">
      <nav class="hidden sm:flex mb-1" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li>
            <div class="flex">
              <a href="#" class="text-sm font-normal text-red-500 hover:text-red-700">Popular categories</a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true"/>
              <a href="#" class="ml-4 text-sm font-normal text-red-500 hover:text-red-700">Appliances</a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true"/>
              <a href="#" aria-current="page"
                 class="ml-4 text-sm font-medium text-red-500 hover:text-red-700">Kettle</a>
            </div>
          </li>
        </ol>
      </nav>

      <h1 class="font-bold text-xl mb-2">SMEG Electric Kettle Pro</h1>

      <div class="flex items-center justify-between mb-3">
        <p class="flex justify-end items-center">
          <span class="text-base font-bold mr-1">{{ product.dish }}</span>
          <img class="h-4 w-4" :src="dish" alt="DISH">
        </p>

        <div class="flex items-center">
          <div class="flex -space-x-3 overflow-hidden mr-2">
            <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                 src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt=""/>
            <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                 src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt=""/>
            <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                 src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                 alt=""/>
            <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt=""/>
          </div>
          <span class="text-xs text-gray-500">3.6k others bought it</span>
        </div>
      </div>

      <h2 class="font-semibold">Description</h2>

      <p v-for="(p, index) in product.description" :key="index" class="text-xs text-gray-500 leading-6 mb-1">
        {{ p }}
      </p>

      <ul role="list" class="divide-y divide-red-200 mb-10">
        <li v-for="item in items" :key="item.id" class="px-4 py-4 sm:px-0 flex justify-between">
          <span class="flex items-center">
            <component :is="item.icon" class="w-6 h-6 mr-2 text-red-500"/>
            <span>{{ item.name }}</span>
          </span>
          <ChevronRightIcon class="w-4 h-4 text-gray-500"/>
        </li>
      </ul>

      <button type="button"
              @click="bought = true"
              class="
              shadow-xl
              inline-flex items-center rounded-full border border-transparent bg-red-500 py-4 text-sm font-bold
               leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400
               focus:ring-offset-2 w-full">
        <span class="w-full">Buy now</span>
      </button>
    </main>
  </div>
</template>

<script lang="ts" setup>
import {definePageMeta, ref, useRouter} from "#imports";
import dish from '../../assets/dish.svg'
import {ShieldCheckIcon, NewspaperIcon, ChevronRightIcon, ChevronLeftIcon} from '@heroicons/vue/20/solid'

definePageMeta({
  layout: 'panel',
})

const bought = ref<boolean>(false);

const product = {
  dish: 300,
  description: [
    'Double-walled body keeps water hot longer while the outside remains cool to the touch.',
    'Has 6 pre-set program settings that will help you make the perfect drink for every occasion. The electric hot water kettle is ideal temperature selection for coffee, tea, baby food, and more.'
  ]
}

const items = [
  {id: 1, name: 'Description', icon: ShieldCheckIcon},
  {id: 2, name: 'Reviews', icon: NewspaperIcon},
]

const router = useRouter();

function back() {
  router.push('/marketplace')
}
</script>
