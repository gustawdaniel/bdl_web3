<script lang="ts" setup>

import {ref, useCookie, useLazyFetch, useRuntimeConfig, watch} from "#imports";
import {Meal} from "~/helpers/api";
import SocialLinkRules from "~/components/meal/SocialLinkRules.vue";

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

watch(data, () => {
  emit('next')
});



</script>

<template>
  <div class="m-4">
    <SocialLinkRules/>

    <form @submit.prevent="setLink" class="text-center">
      <input type="text" v-model.lazy.trim="linkForm"
             class="rounded-full p-2 text-center mb-10 border w-full border-red-200"
             placeholder="https://instagram.com/">
      <button type="submit"
              class="

          w-52 justify-center inline-flex items-center rounded-full border border-transparent bg-red-500 px-3 py-3
             text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
             focus:ring-offset-2 font-bold uppercase shadow-xl mb-8" >
        Send the link
      </button>
    </form>
  </div>
</template>

<style scoped></style>
