<template>
  <div>
    <MetaMaskLogin />
  </div>
</template>

<script lang="ts" setup>
import {useLocalStorage} from "./composables/useLocalStorage";
import MetaMaskLogin from "./components/MetaMaskLogin";
import {useState} from "#imports";

const user = useState('user')
const token = useState<string>('token')

useLocalStorage('user', user)
useLocalStorage<string>('token', token)

</script>
