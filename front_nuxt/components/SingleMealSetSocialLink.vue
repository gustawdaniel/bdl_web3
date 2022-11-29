<script lang="ts" setup>

import {ref, useCookie, useLazyFetch, useRoute, useRuntimeConfig, watch} from "#imports";
const route = useRoute()
const config = useRuntimeConfig();
const token = useCookie('token')
const linkForm = ref<string>("");
const linkBody = ref<{ data: {social_media_post: string} }>({data: {social_media_post: ''}});

const {data} = await useLazyFetch(`${config.public.baseUrl}/api/meals/${route.params.id}`, {
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
  emit('reload')
})

</script>

<template>
  <div>
    Component: SingleMealSetSocialLink

    <form @submit.prevent="setLink">
    <label>
      Link
      <input type="text" v-model.lazy.trim="linkForm">
    </label>
    <button>Save</button>
    </form>

  </div>
</template>

<style scoped></style>
