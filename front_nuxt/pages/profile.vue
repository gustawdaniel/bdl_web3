<script lang="ts" setup>
import {definePageMeta, useCookie, useRouter} from "#imports";

const user = useCookie('user');
const router = useRouter();

if(!user.value) {
  router.push('/login');
}

definePageMeta({
  layout: 'panel'
})
</script>

<template>
  <div v-if="user">
    <p>Email: {{user.email}}</p>

    <nuxt-link to="/meals"><button>My meals</button></nuxt-link>
  </div>
</template>
