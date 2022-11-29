<template>
  <div v-if="!loggedIn">
    <button @click="login">Login with Magic.link</button>
  </div>
  <div v-else>
    <button @click="logout">Logout</button>
    <pre>{{ address }}</pre>
  </div>
</template>

<script setup lang="ts">
import {computed, getWeb3} from "#imports";
import {ref} from "vue";

let address = ref<string>("")

let loggedIn = computed<boolean>(() => {
  return Boolean(address.value)
})

function logout() {
  address.value = '';
}

function login() {
  const web3 = getWeb3('magic')
  web3.eth.getAccounts().then(accounts => {
    address.value = accounts[0];
    console.log(accounts[0])
  });
}
</script>
