<script lang="ts" setup>
import {useCookie, useRouter} from "#imports";

const user = useCookie('user');
const router = useRouter();

if(!user.value) {
  router.push('/login');
}
</script>

<template>
  <div v-if="user">
    <p>Email: {{user.email}}</p>

    <nuxt-link to="/meals"><button>My meals</button></nuxt-link>
  </div>
</template>
