<script lang="ts" setup>

import {computed, nextTick, ref, useCookie, useLazyFetch, useRuntimeConfig, watch} from "#imports";
import { XCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'

const token = useCookie('token');
const user = useCookie('user');
const config = useRuntimeConfig();

const props = defineProps<{ mode: string }>();

const isRegister = computed<boolean>(() => {
  return props.mode === 'register';
})
const isLogin = computed<boolean>(() => {
  return !isRegister.value;
})

interface LoginRequestBody {
  identifier: string,
  password: string
}

interface RegisterRequestBody {
  username: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string
}

interface LoginOrRegisterForm extends LoginRequestBody {
  first_name: string,
  last_name: string,
}

const formBody = ref<LoginOrRegisterForm>({
  first_name: 'Daniel',
  last_name: 'Gustaw',
  password: 'pass',
  identifier: 'user@ok.com'
});

const loginRequestBody = ref<LoginRequestBody>({
  identifier: '',
  password: ''
});

const registerRequestBody = ref<RegisterRequestBody>({
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: ''
});

const requestUrl = computed<string>(
    () => {
      return config.public.baseUrl + (isLogin.value ? '/api/auth/local' : '/api/auth/local/register');
    }
);

const {data, error, execute, pending} = await useLazyFetch<{ jwt: string }>(`${requestUrl.value}`, {
  body: isLogin.value ? loginRequestBody : registerRequestBody,
  method: 'post',
  immediate: false,
  watch: [],
})

const emit = defineEmits(['reload']);

watch(data, async (value) => {
  console.log("value", value);
  token.value = value.jwt;
  user.value = value.user;

  await nextTick();

  emit('reload');
})

function login() {
  console.log(1, formBody.value, data.value);
  if ( JSON.stringify(loginRequestBody.value) === JSON.stringify(formBody.value)) {
    console.log(2);
    execute()
  } else {
    console.log(3);
    loginRequestBody.value = formBody.value;
  }
}

function registerToLogin(data: RegisterRequestBody): LoginRequestBody {
  return {
    identifier: data.email,
    password: data.password
  }
}

function formToRegister(data: LoginOrRegisterForm): RegisterRequestBody {
  return {
    email: data.identifier,
    username: data.identifier,
    password: data.password,
    first_name: data.first_name,
    last_name: data.last_name
  }
}

function register() {
  if (JSON.stringify(registerToLogin(registerRequestBody.value)) === JSON.stringify(formBody.value)) {
    execute()
  } else {
    registerRequestBody.value = formToRegister(formBody.value);
  }
}

function submit() {
  if(isLogin.value) {
    login()
  } else {
    register();
  }
}

const passwordShown = ref<boolean>(false);

function togglePasswordShown() {
  passwordShown.value = !passwordShown.value;
}

const loading = computed<boolean>(() => {
  return Boolean(pending.value) && (Boolean(data.value || false) || Boolean(error.value || false));
})
</script>

<template>
<!--    <hr>-->
<!--    <pre>PENDING: {{ pending }}</pre>-->
<!--    <pre>URL: {{ requestUrl }}</pre>-->
<!--    <pre>DATA: {{ data }}</pre>-->
<!--    <pre>ERROR: {{ error }}</pre>-->
<!--    <hr>-->

  <img src="/logo.svg" alt="Ad Meal" class="mb-8">

  <h1 class="text-xl font-bold mb-2">
    {{ isLogin ? 'Sign in to Admeal' : 'Get started' }}
  </h1>

  <p class="text-slate-600 mb-6">{{ isLogin ? 'Enter your details below' : 'There are two brief steps. First let\'s create an account. Enter your details below.' }}</p>

  <form @submit.prevent="submit">
    <div v-if="isRegister">
      <div class="sm:col-span-4 pt-1 relative mb-3">
        <label for="first_name"
               class="block text-sm font-medium text-gray-700 absolute top-0 left-4 bg-white px-2 text-gray-400">
          First name
        </label>
        <div class="mt-1 border rounded-lg">
          <input required id="first_name" name="first_name" type="text" autocomplete="first_name"
                 v-model.lazy="formBody.first_name"
                 class="block w-full rounded-md border-gray-300 shadow-sm
        focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm p-4"/>
        </div>
      </div>

      <div class="sm:col-span-4 pt-1 relative mb-3">
        <label for="last_name"
               class="block text-sm font-medium text-gray-700 absolute top-0 left-4 bg-white px-2 text-gray-400">
          Last name
        </label>
        <div class="mt-1 border rounded-lg">
          <input required id="last_name" name="last_name" type="text" autocomplete="last_name"
                 v-model.lazy="formBody.last_name"
                 class="block w-full rounded-md border-gray-300 shadow-sm
        focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm p-4"/>
        </div>
      </div>
    </div>

    <div class="sm:col-span-4 pt-1 relative mb-3">
      <label for="email"
             class="block text-sm font-medium text-gray-700 absolute top-0 left-4 bg-white px-2 text-gray-400">
        Email address
      </label>
      <div class="mt-1 border rounded-lg">
        <input id="email" name="email" type="email" autocomplete="email"
               v-model.lazy="formBody.identifier"
               class="block w-full rounded-md border-gray-300 shadow-sm
        focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm p-4"/>
      </div>
    </div>

    <div class="sm:col-span-4 pt-1 mb-2 relative">
      <label for="password"
             class="block text-sm font-medium text-gray-700 absolute top-0 left-4 bg-white px-2 text-gray-400">Password</label>
      <div class="mt-1 border rounded-lg">
        <img src="/password-toggle.svg" alt="password-toggle" class="absolute bottom-5 right-5"
             @click="togglePasswordShown">
        <input id="password" name="password" :type="passwordShown ? 'text' : 'password'" autocomplete="password"
               v-model.lazy="formBody.password"
               class="block w-full rounded-md border-gray-300 shadow-sm
        focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm p-4"/>
      </div>
    </div>

    <div class="flex justify-between p-3" v-if="isLogin">
      <div class="flex items-start">
        <div class="flex h-5 items-center">
          <input id="comments" name="comments" type="checkbox"
                 class="h-4 w-4 accent-red-500 rounded border-gray-300 text-red-600 focus:ring-red-500"/>
        </div>
        <div class="ml-3 text-sm">
          <label for="comments" class="font-medium text-gray-700">Remember me</label>
        </div>
      </div>

      <NuxtLink><span class="text-red-500 text-sm font-semibold">Forgot password?</span></NuxtLink>
    </div>

    <div class="rounded-md bg-red-50 p-4" v-if="error">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-red-800"><span class="font-bold">{{error.name}}</span>: {{ error.message }}</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600
            focus:ring-offset-2 focus:ring-offset-red-50"
                    @click="error = null"
            >
              <span class="sr-only">Dismiss</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <button :type="loading ? 'button' : 'submit'" :class="[isLogin ? 'mb-4' : 'mb-8', 'text-white bg-red-500 w-full rounded-full p-2.5 mt-4 shadow-lg']">
      {{ loading ? 'Loading...' : (isLogin ? 'Login' : 'Register') }}
    </button>

    <p v-if="isLogin" class="text-sm text-center">Don’t have an account?
      <NuxtLink to="/register"><span class="font-semibold text-red-500">Get started</span></NuxtLink>
    </p>
    <p v-if="isRegister" class="text-sm text-center mb-8 text-gray-500">By signing up, I agree to Minimal
      <NuxtLink to="/tos" class="underline text-black">Terms of Service</NuxtLink> and <NuxtLink to="/privacy" class="underline text-black">Privacy Policy.</NuxtLink>
    </p>
    <p v-if="isRegister" class="text-sm text-center">Already have an account?
      <NuxtLink to="/login"><span class="font-semibold text-red-500">Login</span></NuxtLink>
    </p>
  </form>
</template>

<style scoped></style>
