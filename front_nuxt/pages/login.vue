<script lang="ts" setup>
import {ref, useCookie, useLazyFetch, useRuntimeConfig, watch} from "#imports";

const token = useCookie('token');
const user = useCookie('user');
const config = useRuntimeConfig();


function reload() {
  console.log("reload");
  token.value = useCookie('token').value
  user.value = useCookie('user').value
}

function logout() {
  token.value = '';
  user.value = '';
}
</script>

<template>
  <div>
    <pre>{{ token }}</pre>


    <div v-if="token">

      <pre>{{ user }}</pre>

      <nuxt-link to="/profile">
        <button>Profile</button>
      </nuxt-link>
      <nuxt-link to="/recipes">
        <button>Recipes</button>
      </nuxt-link>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <LoginByPassword @reload="reload"/>
      <LoginByOTP @reload="reload"/>

      <button @click="reload">reload</button>
    </div>
  </div>
</template>

