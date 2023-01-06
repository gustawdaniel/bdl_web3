<template>
  <input type="text" class="border w-full p-2 fixed" v-model="search">

  <div class="flex flex-wrap pt-10">

    <div v-for="icon in selectedKeys" class="border p-1 m-1">
      <p>{{ icon }}</p>
      <component :is="icons[icon]" class="h-10 m-auto"/>
    </div>


  </div>
</template>

<script lang="ts" setup>
import * as icons from '@heroicons/vue/24/outline'
import {computed, ref} from "#imports";

const keys = Object.keys(icons);

const search = ref<string>("");

const selectedKeys = computed<string[]>(() => {
  if(!search.value) return keys;
  return keys.filter((key) => key.toLowerCase().includes(search.value.toLowerCase()))
})
</script>
