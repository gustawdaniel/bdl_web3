<template>
  <div class="h-32 w-24  flex flex-col justify-between bg-center bg-cover rounded-2xl"
       :style="{ backgroundImage: 'url(' + recipeImageUrl(recipe, config) + ')' }">

    <div class="flex justify-end">
      <span class="inline-flex items-center rounded-full bg-white py-0.5 pl-2.5 pr-1 text-sm font-medium font-bold mt-2 mr-2">
        <span class="font-bold">+{{ recipe.attributes.dish_reward_for_cooking ?? 0 }}</span>
        <button type="button" class="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none">
          <span class="sr-only">ADM tokens</span>
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="7.5" r="7" fill="#CE3100"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6.83226C3 6.56091 3.21997 6.34094 3.49132 6.34094L7.22532 6.34094C7.49667 6.34094 7.71664 6.56091 7.71664 6.83226C7.71664 7.10361 7.49667 7.32358 7.22532 7.32358L3.49132 7.32358C3.21997 7.32358 3 7.10361 3 6.83226Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.98291 8.40452C3.98291 8.13318 4.15705 7.91321 4.37187 7.91321L7.32796 7.91321C7.54277 7.91321 7.71692 8.13318 7.71692 8.40452C7.71692 8.67587 7.54277 8.89584 7.32796 8.89584H4.37187C4.15705 8.89584 3.98291 8.67587 3.98291 8.40452Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.34152 9.48548H5.35889L5.35889 12.2368L5.85022 12.2368C8.03829 12.2368 9.23206 11.4808 9.85796 10.6253C10.1621 10.2097 10.314 9.79428 10.3902 9.48212C10.4283 9.32569 10.4479 9.19344 10.4579 9.09728C10.463 9.04912 10.4656 9.00976 10.4671 8.98063C10.4678 8.96606 10.4682 8.95402 10.4684 8.9447L10.4685 8.93922L10.4686 8.93277L10.4686 8.92836L10.4686 8.92656L10.4686 8.92576C10.4686 8.92539 10.4686 8.92503 9.99035 8.92502L10.4686 8.92502L10.4686 8.27096H10.4691L10.4691 6.31216L9.99079 6.31216C10.4691 6.31216 10.4691 6.3118 10.4691 6.31143L10.4691 6.31062L10.4691 6.30882L10.4691 6.30441L10.4689 6.29248C10.4686 6.28316 10.4682 6.27112 10.4675 6.25655C10.4661 6.22742 10.4634 6.18805 10.4584 6.13988C10.4484 6.04372 10.4288 5.91145 10.3906 5.75501C10.3145 5.44282 10.1625 5.0274 9.85838 4.61168C9.23242 3.75612 8.03854 3.0001 5.85027 3.00007L5.3589 3.00006L5.35889 5.75148H6.34162L6.34162 3.99773C7.9402 4.09815 8.69537 4.68638 9.06527 5.19196C9.27705 5.48141 9.38305 5.77116 9.4359 5.98785C9.46224 6.09585 9.47493 6.18395 9.481 6.24204C9.48403 6.271 9.48538 6.29223 9.48598 6.30442L9.4864 6.31523L9.48641 6.31567L9.48641 6.96646H9.48603L9.48602 8.92152L9.48601 8.92195L9.48559 8.93276C9.48499 8.94495 9.48364 8.96618 9.48061 8.99513C9.47454 9.05322 9.46185 9.14131 9.43552 9.2493C9.38267 9.46597 9.27668 9.7557 9.06492 10.0451C8.69506 10.5506 7.93995 11.1388 6.34152 11.2392L6.34152 9.48548Z" fill="white"/>
          </svg>

        </button>
      </span>
    </div>



    <div class="m-1">
      <span class="text-xs text-white bg-black opacity-75 p-1">{{recipe.attributes.name}}</span>
    </div>

  </div>

<!--  <pre>{{ recipe.attributes.photo.data.attributes }}</pre>-->
</template>

<script lang="ts" setup>

import {useRuntimeConfig} from "#imports";
import {Recipe, recipeImageUrl} from "~/helpers/api";

const config = useRuntimeConfig();


// v-if="recipe.attributes.photo.data && recipe.attributes.photo.data.attributes.formats"
//     :src="`${config.public.baseUrl}${recipe.attributes.photo.data.attributes.formats.thumbnail.url}`"

const props = defineProps<{recipe: Recipe}>()

</script>
