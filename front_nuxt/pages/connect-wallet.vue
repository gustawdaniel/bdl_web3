<script lang="ts" setup>

// if('process' in window) {
//   window.process = {
//     nextTick() {},
//     env: {
//       NODE_DEBUG: false
//     }
//   }
// }

import {
  computed,
  nextTick,
  onMounted,
  ref,
  useCookie,
  useLazyFetch,
  useRouter,
  useRuntimeConfig,
  watch
} from "#imports";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Web3 from 'web3'

const INFURA_API_KEY = '32c67bd1a0834501b3bef586026f1ddc';
const INFURA_JSON_RPC_URL = `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`
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
const config = useRuntimeConfig();

function createAdmealWallet() {
  error.value = {
    message: 'Not implemented',
    stack: 'No details',
    code: 0
  }
}

const updateWalletBody = ref<Pick<'wallet_address' | 'wallet_type', User>>({
  wallet_address: '',
  wallet_type: ''
});

const token = useCookie('token');
const user = useCookie<User | ''>('user');

onMounted(() => {
  console.log("user.value", user.value);
  console.log("token.value", token.value);
  if (!user.value || !token.value) {
    router.push('/logout');
  }
});
const sec = ref<number>(3)

const requestUrl = ref<string>(`${config.public.baseUrl}/api/users/${user.value?.id}`)

const {data, error: requestError, execute, pending} = await useLazyFetch<{ jwt: string }>(`${requestUrl.value}`, {
  body: updateWalletBody,
  method: 'put',
  immediate: false,
  watch: [],
  headers: {
    Authorization: `Bearer ${token.value}`
  },
})

const router = useRouter();

watch(data, async (value) => {
  console.log("value", value);
  user.value = value;

  const int = setInterval(() => {
    if (sec.value > 0) {
      sec.value--
    } else {
      clearInterval(int);
      // sec.value = 3;
      router.push('/recipes');
    }

  }, 1000)

  await nextTick();

})

async function connectMetaMask() {
  console.log("connectMetaMask");
  try {
    await ethereum.enable();

    updateWalletBody.value = {
      wallet_address: ethereum.selectedAddress,
      wallet_type: 'metamask'
    }

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
  window.web3 = web3;

  const address = window.web3.currentProvider.selectedAddress;

  console.log("selectedAddress", address);

  updateWalletBody.value = {
    wallet_address: address,
    wallet_type: 'coinbase'
  }

  execute();

  success.value = `Metamask connected. Your wallet address: ${ethereum.selectedAddress}`;
}

const buttons = [
  {
    title: "Create Admeal wallet",
    action: createAdmealWallet,
    image: '/logo.svg'
  }, {
    title: "Connect MetaMask wallet",
    action: connectMetaMask,
    image: '/metamask.svg'
  }, {
    title: "Connect Coinbase wallet",
    action: connectCoinbase,
    image: '/coinbase.svg'
  },
]
import {XCircleIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon, XMarkIcon} from '@heroicons/vue/20/solid'
import {User} from "~/helpers/api";
import {CookieRef} from "#app";

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

    <!--    <pre>user {{user}}</pre>-->
    <!--    <pre>token {{token}}</pre>-->

    <!--    success -->
    <div class="rounded-md bg-green-50 p-4 mb-10" v-if="success">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true"/>
        </div>
        <div class="ml-3 flex-1 flex  justify-between">
          <h3 class="text-sm font-medium text-green-800">{{ success }}</h3>
        </div>

        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none
            focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50" @click="success = ''">
              <span class="sr-only">Dismiss</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true"/>
            </button>
          </div>
        </div>

      </div>
      <div v-if="data">
        <div class="ml-3">
          <div class="mt-2 text-sm text-green-700">
            You will be redirected for {{ sec }} seconds...
          </div>
        </div>
      </div>
    </div>

    <!--    error -->
    <div class="rounded-md bg-red-50 p-4 mb-10" v-if="error">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true"/>
        </div>
        <div class="ml-3 flex-1 flex  justify-between">
          <h3 class="text-sm font-medium text-red-800">[{{ error.code }}] {{ error.message }}</h3>
        </div>
        <div class="ml-auto pl-3" v-if="!showErrorDetails">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none
            focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                    @click="showErrorDetails = true">
              <span class="sr-only">Dismiss</span>
              <ChevronDoubleDownIcon class="h-5 w-5" aria-hidden="true"/>
            </button>
          </div>
        </div>
        <div class="ml-auto pl-3" v-if="showErrorDetails">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none
            focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                    @click="showErrorDetails = false">
              <span class="sr-only">Dismiss</span>
              <ChevronDoubleUpIcon class="h-5 w-5" aria-hidden="true"/>
            </button>
          </div>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none
            focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50" @click="closeErrorAlert">
              <span class="sr-only">Dismiss</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true"/>
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
      <button :key="index" v-for="(button, index) in buttons" @click="button.action"
              class="flex items-center w-full bg-gray-100 hover:bg-gray-200 rounded-full mb-3">
        <span class="py-3 px-4 flex items-center">
        <img :src="button.image" :alt="button.title" class="h-6 w-6 mr-2">
        <span class="font-bold">{{ button.title }}</span>
          </span>
      </button>
    </div>
  </main>
</template>

<style scoped></style>
