<script lang="ts" setup>

function createAdmealWallet() {
  console.log("createAdmealWallet");
}

function connectMetaMask() {
  console.log("connectMetaMask");
}

function connectCoinbase() {
  console.log("connectCoinbase");
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

</script>

<template>
  <main class="p-5 mt-24">
    <div class="mb-10">
      <h1 class="font-bold text-2xl mb-4">Half way done!</h1>
      <p class="text-base text-gray-500">Now let’s connect your crypto wallet or create a new one.</p>
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
