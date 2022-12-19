<template>
  <p>Logging out...</p>
</template>

<script setup lang="ts">
import {onMounted, useCookie, useRouter} from "#imports";
import {User} from "~/helpers/api";
const router = useRouter();

const token = useCookie<string>('token');
const user = useCookie<User | ''>('user');

function logout() {
  token.value = '';
  user.value = '';
}

onMounted(() => {
  logout();
  router.push('/');
})
</script>


<style scoped>

</style>
