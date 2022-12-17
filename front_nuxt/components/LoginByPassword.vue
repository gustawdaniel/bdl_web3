<script lang="ts" setup>

import {computed, nextTick, ref, useCookie, useLazyFetch, useRuntimeConfig, watch} from "#imports";

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
  identifier: string, password: string
}

const formBody = ref<LoginRequestBody>({
  identifier: 'user@ok.com',
  password: 'pass'
});

interface RegisterRequestBody {
  username: string,
  email: string,
  password: string
}

const loginRequestBody = ref<LoginRequestBody>({
  identifier: '',
  password: ''
});

const registerRequestBody = ref<RegisterRequestBody>({
  username: '',
  email: '',
  password: ''
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
  token.value = value.jwt;
  user.value = value.user;

  await nextTick();

  emit('reload');
})

function login() {
  if (JSON.stringify(loginRequestBody.value) === JSON.stringify(formBody.value)) {
    execute()
  } else {
    loginRequestBody.value = formBody.value;
  }
}

function registerToLogin(data: RegisterRequestBody): LoginRequestBody {
  return {
    identifier: data.email,
    password: data.password
  }
}

function loginToRegister(data: LoginRequestBody): RegisterRequestBody {
  return {
    email: data.identifier,
    username: data.identifier,
    password: data.password
  }
}

function register() {
  if (JSON.stringify(registerToLogin(registerRequestBody.value)) === JSON.stringify(formBody.value)) {
    execute()
  } else {
    registerRequestBody.value = loginToRegister(formBody.value);
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

</script>

<template>
    <hr>
    <pre>PENDING: {{ pending }}</pre>
    <pre>URL: {{ requestUrl }}</pre>
    <pre>DATA: {{ data }}</pre>
    <pre>ERROR: {{ error }}</pre>
    <hr>

  <img src="/logo.svg" alt="Ad Meal" class="mb-8">

  <h1 class="text-xl font-bold mb-2">
    {{ isLogin ? 'Sign in to Admeal' : 'Create account in Admeal' }}
  </h1>

  <p class="text-slate-600 mb-6">Enter your details below</p>


  <form @submit.prevent="submit">

    <div class="sm:col-span-4 pt-1 relative mb-3">
      <label for="email"
             class="block text-sm font-medium text-gray-700 absolute top-0 left-4 bg-white px-2 text-gray-400">Email
        address</label>
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

    <div class="flex justify-between p-3">
      <div class="flex items-start">
        <div class="flex h-5 items-center">
          <input id="comments" name="comments" type="checkbox"
                 class="h-4 w-4 accent-red-500 rounded border-gray-300 text-red-600 focus:ring-red-500"/>
        </div>
        <div class="ml-3 text-sm">
          <label for="comments" class="font-medium text-gray-700">Remember me</label>
        </div>
      </div>

      <NuxtLink
          v-if="isLogin"
      ><span class="text-red-500 text-sm font-semibold">Forgot password?</span></NuxtLink>
    </div>


    <button type="submit" class="text-white bg-red-500 w-full rounded-full p-2.5 my-4">
      {{ isLogin ? 'Login' : 'Register' }}
    </button>

    <p v-if="isLogin" class="text-sm text-center">Don’t have an account?
      <NuxtLink to="/register"><span class="font-semibold text-red-500">Get started</span></NuxtLink>
    </p>
    <p v-if="isRegister" class="text-sm text-center">Have already an account?
      <NuxtLink to="/login"><span class="font-semibold text-red-500">Login</span></NuxtLink>
    </p>
  </form>
</template>

<style scoped></style>
