<script lang="ts" setup>

import {ref} from "#imports";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Web3 from 'web3'

const INFURA_API_KEY = '32c67bd1a0834501b3bef586026f1ddc';
const INFURA_JSON_RPC_URL=`https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`
const APP_NAME = 'Admeal App'
const APP_LOGO_URL = 'https://admeal.xyz/logo.svg'
const DEFAULT_CHAIN_ID = 1

const error = ref<null | {
  code: number,
  message: string,
  stack: string
}>(null) // {code: 0, message: '', stack: ''}

const success = ref<string>('');

const showErrorDetails = ref<boolean>(false);

function createAdmealWallet() {
  error.value = {
    message: 'Not implemented',
    stack: 'No details',
    code: 0
  }
}

async function connectMetaMask() {
  console.log("connectMetaMask");
  try {
    await ethereum.enable();
    success.value = `Metamask connected. Your wallet address: ${ethereum.selectedAddress}`;
  } catch (err) {
    console.log("err", err);
    error.value = {
      message: err.message,
      code: err.code,
      stack: err.stack
    }
  }
}

(window as any).global = window;

function connectCoinbase() {
  console.log("connectCoinbase");
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false
  })

  const ethereum = coinbaseWallet.makeWeb3Provider(INFURA_JSON_RPC_URL, DEFAULT_CHAIN_ID)

  const web3 = new Web3(ethereum as any);
  // window.web3 = web3;
  console.log("currentProvider", web3.currentProvider);

  web3.currentProvider.enable();

  console.log("defaultAccount", web3.defaultAccount);
}

const buttons = [
    {
  title: "Create Admeal wallet",
  action: createAdmealWallet,
      image: '/logo.svg'
},{
    title: "Connect MetaMask wallet",
    action: connectMetaMask,
    image: '/metamask.svg'
  },{
    title: "Connect Coinbase wallet",
    action: connectCoinbase,
    image: '/coinbase.svg'
  },
]
import { XCircleIcon, ChevronDoubleDownIcon,ChevronDoubleUpIcon, XMarkIcon } from '@heroicons/vue/20/solid'

function closeErrorAlert() {
  showErrorDetails.value = false;
  error.value = null;
}
</script>

<template>
  <main class="p-5 mt-24">
    <div class="mb-10">
      <h1 class="font-bold text-2xl mb-4">Half way done!</h1>
      <p class="text-base text-gray-500">Now let’s connect your crypto wallet or create a new one.</p>
    </div>

<!--    success -->
    <div class="rounded-md bg-green-50 p-4 mb-10" v-if="success">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div class="ml-3 flex-1 flex  justify-between">
          <h3 class="text-sm font-medium text-green-800">{{ success }}</h3>
        </div>

        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none
            focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50" @click="success = ''">
              <span class="sr-only">Dismiss</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </div>

<!--    error -->
    <div class="rounded-md bg-red-50 p-4 mb-10" v-if="error">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3 flex-1 flex  justify-between">
          <h3 class="text-sm font-medium text-red-800">[{{error.code}}] {{ error.message }}</h3>
        </div>
        <div class="ml-auto pl-3" v-if="!showErrorDetails">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none
            focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50" @click="showErrorDetails = true">
              <span class="sr-only">Dismiss</span>
              <ChevronDoubleDownIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div class="ml-auto pl-3" v-if="showErrorDetails">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none
            focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50" @click="showErrorDetails = false">
              <span class="sr-only">Dismiss</span>
              <ChevronDoubleUpIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none
            focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50" @click="closeErrorAlert">
              <span class="sr-only">Dismiss</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
      <div v-if="showErrorDetails">
        <div class="ml-3">
          <div class="mt-2 text-sm text-red-700">
            <pre>{{ error.stack }}</pre>
          </div>
        </div>
      </div>
    </div>

    <div>
      <button :key="index" v-for="(button, index) in buttons" @click="button.action" class="flex items-center w-full bg-gray-100 hover:bg-gray-200 rounded-full mb-3">
        <span class="py-3 px-4 flex items-center">
        <img :src="button.image" :alt="button.title" class="h-6 w-6 mr-2">
        <span class="font-bold">{{button.title}}</span>
          </span>
      </button>
    </div>
  </main>
</template>

<style scoped></style>
