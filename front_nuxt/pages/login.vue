<script lang="ts" setup>
import { useCookie, useRouter, useRuntimeConfig} from "#imports";
import {User} from "~/helpers/api";

const token = useCookie('token');
const user = useCookie<User | ''>('user');
const config = useRuntimeConfig();
const router = useRouter();


function reload() {
  console.log("reload");
  token.value = useCookie('token').value
  user.value = useCookie<User | ''>('user').value
  if(user.value.wallet_address) {
    router.push('/recipes')
  } else {
    router.push('/connect-wallet');
  }

}

function logout() {
  token.value = '';
  user.value = '';
}
</script>

<template>
  <div class="m-4">
    <div v-if="token">

      <nuxt-link to="/profile">
        <button>Profile</button>
      </nuxt-link>
      <nuxt-link to="/recipes">
        <button>Recipes</button>
      </nuxt-link>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <LoginByPassword @reload="reload" mode="login"/>
<!--      <LoginByOTP @reload="reload"/>-->

<!--      <button @click="reload">reload</button>-->
    </div>
  </div>
</template>

