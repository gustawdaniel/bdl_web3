<script lang="ts" setup>
import {nextTick, ref, useCookie, useLazyFetch, useRuntimeConfig, watch} from "#imports";

const email = ref<string>("gustaw.daniel@gmail.com")
const code = ref<string>("")
const user = useCookie('user');
const token = useCookie('token');

const config = useRuntimeConfig();

const showEmailInput = ref<boolean>(true);
const showTokenInput = ref<boolean>(false);

const emailRequestStarted = ref<boolean>(false);
const tokenRequestStarted = ref<boolean>(false);

const requestBody = ref<{ email: string }>({
  email: '',
});
const requestQuery = ref<{ confirmation: string }>({
  confirmation: '',
});

const {execute: executeSendEmail, data: dataEmail, pending: pendingEmail} = await useLazyFetch(`${config.public.baseUrl}/api/auth/otp`, {
  body: requestBody,
  method: 'post',
  immediate: false,
  watch: [],
})

const {execute: executeCheckToken, data: dataToken, pending: pendingCode} = await useLazyFetch(`${config.public.baseUrl}/api/auth/otp`, {
  query: requestQuery,
  immediate: false,
  watch: [],
})

watch(dataEmail, () => {
  showEmailInput.value = false;
  showTokenInput.value = true;
})

const emit = defineEmits(['reload']);

watch(dataToken, async (value) => {
  token.value = value.jwt;
  user.value = value.user;

  await nextTick();

  emit('reload');
})
function sendEmail() {
  emailRequestStarted.value = true;
  if (JSON.stringify(requestBody.value) === JSON.stringify({email: email.value})) {
    executeSendEmail();
  } else {
    requestBody.value = {email: email.value}
  }
}

function checkToken() {
  tokenRequestStarted.value = true;
  if (JSON.stringify(requestQuery.value) === JSON.stringify({confirmation: code.value})) {
    executeCheckToken()
  } else {
    requestQuery.value = {confirmation: code.value}
  }
}

</script>

<template>
  <div>
    <form @submit.prevent="sendEmail" v-if="showEmailInput">
      <label>
        Email
        <input type="email" v-model="email">
      </label>
      <button>Login</button>
    </form>
    <div v-if="pendingEmail && emailRequestStarted">
      <p>Sending email</p>
    </div>
    <form @submit.prevent="checkToken" v-if="showTokenInput">
      <p>Email: {{ email }}</p>
      <label>
        Token
        <input type="text" v-model="code">
      </label>
      <button>Login</button>
    </form>
    <div v-if="pendingCode && tokenRequestStarted">
      <p>Checking Code</p>
    </div>
  </div>
</template>

<style scoped></style>
