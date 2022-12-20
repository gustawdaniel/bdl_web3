<script lang="ts" setup>
import {useCookie, useRouter} from "#imports";
import {User} from "~/helpers/api";

const router = useRouter();
const token = useCookie('token');
const user = useCookie<User | ''>('user');

function reload() {
  token.value = useCookie('token').value
  user.value = useCookie<User | ''>('user').value
  if(user.value.wallet_address) {
    router.push('/profile');
  } else {
    router.push('/connect-wallet');
  }
}

</script>

<template>
  <div class="m-4">
    <LoginByPassword @reload="reload" mode="register"/>
  </div>
</template>

