<script lang="ts" setup>
import {computed, onMounted, ref, useCookie, useLazyFetch, useRoute, useRuntimeConfig, watch} from "#imports";
import {Meal} from "~/helpers/api";

const token = useCookie('token')
const config = useRuntimeConfig();
type ImageKey = 'meal_image' | 'ingredients_image';

const text: {
  success: Record<ImageKey, string>,
  desc: Record<ImageKey, string[]>,
  cta: Record<ImageKey, string>,
  button: Record<ImageKey, string>
} = {
  success: {
    ingredients_image: 'Photo of ingredients',
    meal_image: 'Congratulations!'
  },
  desc: {
    ingredients_image: ['Nice shot!', 'Now you can go back to recipe and start cooking.'],
    meal_image: ['The reward is in your Wallet. Check it and enjoy your meal.']
  },
  cta: {
    ingredients_image: 'Take a photo of prepared dish',
    meal_image: 'Share the result in social media and get ADM tokens!'
  },
  button: {
    ingredients_image: 'Ready',
    meal_image: 'How to share!'
  }
};

type Stage = 'capture' | 'accept';

const stage = computed<Stage>(() => {
  return previewUrl.value ? 'accept' : 'capture';
});

const startedWithUploadedPreview = computed<boolean>(() => {
  return previewUrl.value ? previewUrl.value.startsWith(config.public.baseUrl) : false;
});

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

const blobRef = ref<Blob>();
const blobName = ref<string>('');

function uploadFile(e) {
  const file = e.target.files[0];
  console.log("files[0]", file);
  previewUrl.value = URL.createObjectURL(file);

  blobRef.value = file;
  blobName.value = file.name;

  // uploadBody.value = new FormData();
  // uploadBody.value.append("files", file, file.name);
  //
  // uploadExecute();
}

watch(uploadData, (value: Array<{ id: number }>) => {
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

const emit = defineEmits(['reload', 'prev', 'next']);

watch(setImageData, () => {
  emit('reload')
})

const previewUrl = ref<string>('');

import Camera from "simple-vue-camera";

const cameraRef = ref<InstanceType<typeof Camera>>();

// Use camera reference to call functions
const snapshot = async () => {
  let blob: Blob = await cameraRef.value?.snapshot() as Blob;

  if (blob?.constructor.name === 'Blob') {
    previewUrl.value = URL.createObjectURL(blob);

    blobRef.value = blob;
    blobName.value = 'photo.jpg';

  }
}

if (props.meal.attributes[props.imageKey]?.data && props.meal.attributes[props.imageKey]?.data?.attributes.url) {
  previewUrl.value = `${config.public.baseUrl}${props.meal.attributes[props.imageKey]?.data?.attributes.url}`
}

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ViewfinderCircleIcon,
  PhotoIcon,
} from '@heroicons/vue/24/outline'

async function saveImageOnServer() {
  console.log("blobRef.value.constructor.name", blobRef.value.constructor.name);

  if (blobRef.value && ['Blob', 'File'].includes(blobRef.value.constructor.name)) {
    uploadBody.value = new FormData();
    uploadBody.value.append("files", blobRef.value as Blob | File, blobName.value);

    await uploadExecute();
  }
}

const noCameraSupportWarning = ref<boolean>(false);
const noPermissionSupportWarning = ref<boolean>(false);

onMounted(() => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    noCameraSupportWarning.value = true;
  } else {
    navigator.permissions.query(<PermissionDescriptor>{name: 'camera'}).then(res => {
      if (res.state == "granted") {
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
              cameraDevices.value = devices.filter(dev => dev.kind === 'videoinput' && dev.label);
              console.log(cameraDevices.value);
            })
      } else {
        noPermissionSupportWarning.value = true;
      }
    });
  }
})

import dish from '../assets/dish.svg';

import {XCircleIcon} from '@heroicons/vue/20/solid'

const cameraDevices = ref([]);
</script>

<template>
  <div>
    <nav class="flex justify-between mb-10" @click="emit('prev')">
      <div class="flex cursor-pointer">
        <ChevronLeftIcon class="h-6 w-6 mr-2"/>
        <span>Back</span>
      </div>
      <div class="flex cursor-pointer" @click="emit('next')">
        <span>Next</span>
        <ChevronRightIcon class="h-6 w-6 ml-2"/>
      </div>
    </nav>
    <div v-if="stage === 'capture'">

      <div v-if="cameraDevices.length === 0" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true"/>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">You cannot use camera</h3>
            <div class="mt-2 text-sm text-red-700">
              <ul role="list" class="list-disc space-y-1 pl-5">
                <li v-if="noCameraSupportWarning">This browser does not support the API yet</li>
                <li v-if="noPermissionSupportWarning">This browser do not have permissions to use cameras</li>
                <li v-if="!noCameraSupportWarning && !noPermissionSupportWarning">This browser do not have access to any
                  camera device
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cameraDevices.length" class="relative">
<!--        <div class="-scale-x-100 ">-->
        <div class="">
          <camera :resolution="{ width: 375, height: 812 }" ref="cameraRef" autoplay />
        </div>

        <label class="absolute bottom-4 left-4  text-gray-100  hover:text-gray-200 w-16 h-16 rounded-full
                       bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">
          <PhotoIcon class="m-2"/>
          <input
              class="hidden"
              accept="image/*"
              type="file"
              @change="uploadFile">
        </label>

        <button class="absolute bottom-4 m-auto left-0 right-0 text-gray-100 hover:text-gray-200 w-16 h-16 rounded-full
                       bg-red-500 hover:bg-red-600 text-white" @click="snapshot">
          <ViewfinderCircleIcon class="m-2"/>
        </button>
      </div>


      <div class="sm:col-span-6" v-if="cameraDevices.length === 0">
        <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div class="space-y-1 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                 aria-hidden="true">
              <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="flex text-sm text-gray-600">
              <label for="file-upload" class="cursor-pointer rounded-md bg-white font-medium text-center w-full
               text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500
               focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*"
                       @change="uploadFile"/>
              </label>
            </div>
            <p class="text-xs text-gray-500">JPEG, PNG, GIF, SVG, TIFF, ICO, DVU up to 10MB</p>
          </div>
        </div>
      </div>


    </div>
    <div v-else-if="stage === 'accept'" class="text-center mx-4">
      <div class="my-4 mb-10">
        <img :src="previewUrl" alt="Preview Url" v-if="previewUrl" class="border m-auto w-full rounded-xl">
      </div>

      <div class="flex flex-col items-center">
        <h1 class="text-2xl mb-3 font-bold">
          {{ startedWithUploadedPreview ? text.success[imageKey] : 'Great! Upload this photo?' }}</h1>

        <div v-if="startedWithUploadedPreview">


          <div v-if="imageKey === 'meal_image'" class="mb-3">
            <p class="text-lg text-gray-500">You earned</p>
            <span class="flex justify-center items-center">
              <span class="mr-1 text-2xl font-bold">{{ meal.attributes.recipe.data.attributes.dish_reward_for_cooking }}</span>
              <img class="h-5 w-5" :src="dish" alt="DISC">
            </span>
          </div>

          <div class="text-sm text-gray-500 mb-10">
          <p v-for="desc in text.desc[imageKey]" :key="desc">
            {{desc}}
          </p>
          </div>

          <h3 class="font-bold text-xl">{{text.cta[imageKey]}}</h3>


          <button type="button"
                  class="
                mt-5
        w-52 justify-center inline-flex items-center rounded-full border border-transparent bg-red-500 px-3 py-3
           text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
           focus:ring-offset-2 font-bold uppercase shadow-xl mb-8" @click="emit('next')">
            {{ text.button[imageKey] }}
          </button>
        </div>

        <button type="button"
                v-else-if="!startedWithUploadedPreview"
                class="
                mt-5
        w-52 justify-center inline-flex items-center rounded-full border border-transparent bg-red-500 px-3 py-3
           text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
           focus:ring-offset-2 font-bold uppercase shadow-xl mb-8" @click="saveImageOnServer">
          Upload
        </button>

        <button class="mb-8 underline font-medium text-sm" @click="previewUrl = ''">
          Take another shot
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.-scale-x-100 {
  transform: scaleX(-1);
}
</style>
