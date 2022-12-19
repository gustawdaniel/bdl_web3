<template>
  <div class="bg-gray-50">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl divide-y-2 divide-gray-200">
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently asked
          questions</h2>
        <dl class="mt-6 space-y-6 divide-y divide-gray-200">
          <Disclosure as="div" v-for="faq in faqs" :key="faq.question" class="pt-6" v-slot="{ open }">
            <dt class="text-lg">
              <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-400">
                <span class="font-medium text-gray-900">{{ faq.question }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform']"
                                   aria-hidden="true"/>
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <p class="text-base text-gray-500">{{ faq.answer }}</p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {definePageMeta} from "#imports";

definePageMeta({
  layout: 'panel'
})

import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import {ChevronDownIcon} from '@heroicons/vue/24/outline'

interface Faq {
  question: string,
  answer: string
}

const faqs: Array<Faq> = [
  {
    question: "What are DISH and DMD tokens?",
    answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consecrate radicalising elit. Quasi cupidity laborious fugit.",
  },
  {
    question: 'How to tokens?',
    answer: '...'
  },
  {
    question: 'How to use tokens, why I can send them to other users?',
    answer: '...'
  },
  {
    question: 'How to add my own recipe?',
    answer: '...'
  }
]
</script>

<style scoped>

</style>
