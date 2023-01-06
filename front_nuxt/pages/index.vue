<script lang="ts" setup>

import {onMounted, useCookie, useRouter} from "#imports";

const user = useCookie('user');
const router = useRouter();

onMounted(() => {
  if(user.value) {
    router.push('/recipes')
  } else {
    router.push('/login')
  }
})

</script>

<template>
  <div>
    <nuxt-link to="/login">
    <button>Login</button>
    </nuxt-link>


  </div>
</template>
