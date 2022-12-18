<script lang="ts" setup>
import {ref, useCookie, useLazyFetch, useRoute, useRuntimeConfig, watch} from "#imports";
import {Meal} from "~/helpers/api";

const token = useCookie('token')
const config = useRuntimeConfig();
type ImageKey = 'meal_image' | 'ingredients_image';

const props = defineProps<{
  meal: Meal
  imageKey: ImageKey
}>()
const uploadBody = ref<FormData>(new FormData());
const setImageBody = ref<{ data: any }>({data: {[props.imageKey]: NaN}});
const route = useRoute()

console.log(uploadBody.value);

const {
  data: uploadData,
  pending: uploadPending,
  execute: uploadExecute
} = await useLazyFetch(`${config.public.baseUrl}/api/upload`, {
  body: uploadBody,
  method: 'post',
  immediate: false,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})

const {
  data: setImageData,
  pending: setImagePending,
  execute: setImageExecute
} = await useLazyFetch(`${config.public.baseUrl}/api/meals/${route.params.id}`, {
  body: setImageBody,
  method: 'put',
  immediate: false,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})

function uploadFile(e) {
  const file = e.target.files[0];
  console.log("files[0]", file);
  uploadBody.value = new FormData();
  uploadBody.value.append("files", file, file.name);

  uploadExecute();
}

watch(uploadData, (value) => {
  console.log("uploaded", value)
  if (value.length) {
    const imageId: number = value[0].id;
    console.log("id", imageId);
    setImageBody.value = {
      data: {
        [props.imageKey]: imageId
      }
    }
  }
})

const emit = defineEmits(['reload']);

watch(setImageData, () => {
  emit('reload')
})

</script>

<template>
  <div>
    Component: SingleMealUploadImage

    <p>Upload image</p>

    <pre>KEY: {{props.imageKey}}</pre>

    <img
        v-if="props.meal.attributes[props.imageKey].data && props.meal.attributes[props.imageKey].data.attributes.formats"
        :src="`${config.public.baseUrl}${props.meal.attributes[props.imageKey].data.attributes.formats.thumbnail.url}`"
        alt="">

    <input
        accept="image/*"
        type="file"
        @change="uploadFile">
  </div>
</template>

<style scoped></style>
