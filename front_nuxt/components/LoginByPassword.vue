<script lang="ts" setup>


import {nextTick, ref, useCookie, useLazyFetch, useRuntimeConfig, watch} from "#imports";

const token = useCookie('token');
const user = useCookie('user');
const config = useRuntimeConfig();

const formBody = ref<{ identifier: string, password: string }>({
  identifier: 'user@ok.com',
  password: 'pass'
});

const requestBody = ref<{ identifier: string, password: string }>({
  identifier: '',
  password: ''
});

// const {data: version} = await useFetch(`${config.public.baseUrl}/api/version`)
const {data, error, execute, pending} = await useLazyFetch<{ jwt: string }>(`${config.public.baseUrl}/api/auth/local`, {
  body: requestBody,
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
  if(JSON.stringify(requestBody.value) === JSON.stringify(formBody.value)) {
    execute()
  } else {
    requestBody.value = formBody.value;
  }
}

</script>

<template>
  <hr>
  <pre>PENDING: {{ pending }}</pre>
  <pre>DATA: {{ data }}</pre>
  <pre>ERROR: {{ error }}</pre>
  <hr>

  <form @submit.prevent="login">
    <label for="email">
      Email
      <input type="text" v-model.lazy="formBody.identifier">
    </label>
    <label for="password">
      Password
      <input type="password" v-model.lazy="formBody.password">
    </label>

    <button>Login</button>
  </form>
</template>

<style scoped></style>
