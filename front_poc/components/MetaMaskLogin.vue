<template>
  <button v-if="!loggedIn" @click="login">
    <span>Login with Metamask</span>
  </button>
  <div v-else>
    <button @click="logout">Logout</button>


    <div>jwt token: {{ token }}</div>
    <button @click="get_welcome">click to get welcome</button>
    <div>{{ (user != null) ? user : "" }}</div>


    <input type="text" v-model="text">
    <button @click="setMessage">Set message</button>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'
import {useState, useRuntimeConfig, computed, getWeb3} from '#imports';
import HelloWorld from '../assets/contracts/HelloWorld.sol/HelloWorld.json';
import {AbiItem} from "web3-utils";
import {a} from "vite-node/types-257c4f87";
import {Transaction, TransactionReceipt} from "web3-core";

const config = useRuntimeConfig()
const user = useState('user');
const token = useState('token');
const ethereum = window.ethereum
let account: [string] | null = null
let address: string | null = null
let welcome = ref(null)
let loggedIn = computed<boolean>(() => {
  return Boolean(token.value)
})
let text = ref<string>("")


function utf8ToHex(str: string): string {
  return Array.from(str).map(c =>
      c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) :
          encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
  ).join('');
}

const myContractAbi: AbiItem[] = HelloWorld.abi as AbiItem[];
const myContractAddress = config.public.contractAddress;

async function setMessage() {
  console.log(text.value);
  console.log(1);
  const web3 = getWeb3();
  console.log(2);

  console.log(window.web3);
  console.log(web3);

  const myContractInstance = new web3.eth.Contract(myContractAbi, myContractAddress)

  console.log("myContractInstance", myContractInstance);

  myContractInstance.methods.update(text.value)
      .send({
        from: ethereum.selectedAddress
        ,gasPrice: 0
      })
      .then(
          (res: TransactionReceipt) => {
            console.log("done",res);
          }
      )
}

async function login() {
  if (address === null || account === null) {
    const accounts = await ethereum.request({method: 'eth_requestAccounts'})
    account = accounts[0]
    address = ethereum.selectedAddress
  }
  const [status_code, nonce] = await get_nonce()
  if (status_code === 404) {
    const registered = await register()
    if (!registered) {
      return
    }
    await login()
    return
  } else if (status_code !== 200) {
    return
  }

  console.log("address", address);
  console.log("nonce", nonce);
  const signature = await sign(nonce);
  console.log("signature", signature);

  const data = await perform_signin(signature, nonce)
  token.value = data.token
}

function logout() {
  token.value = "";
  user.value = null;
}

async function get_welcome() {
  const reqOpts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token.value
    },
  }
  const response = await fetch(`${config.public.apiUrl}/me`, reqOpts)
  if (response.status === 200) {
    welcome.value = await response.json()
    user.value = welcome.value;
  } else {
    console.log(response.status)
  }
}

async function get_nonce() {
  const reqOpts = {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  }
  const response = await fetch(`${config.public.apiUrl}/users/${address}/nonce`, reqOpts)
  if (response.status === 200) {
    const data = await response.json()
    const nonce = data.nonce
    return [200, nonce]
  }
  return [response.status, ""]
}

async function register() {
  const reqOpts = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      address: address,
    })
  }
  const response = await fetch(`${config.public.apiUrl}/register`, reqOpts)
  return response.status === 201;

}

async function sign(nonce: string) {
  return await ethereum.request({
    method: "personal_sign",
    params: [utf8ToHex(nonce), account],
  })
}

async function perform_signin(sig: string, nonce: string) {
  const reqOpts = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      address: address,
      nonce: nonce,
      sig: sig,
    })
  }
  const response = await fetch(`${config.public.apiUrl}/login`, reqOpts)
  if (response.status === 200) {
    return await response.json()
  }
  return null
}

</script>
