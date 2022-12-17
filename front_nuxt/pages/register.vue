<script lang="ts" setup>
import {useRouter} from "#imports";

const router = useRouter();

function reload() {
  router.push('/profile');
}

</script>

<template>
  <div class="m-4">
    <LoginByPassword @reload="reload" mode="register"/>
  </div>
</template>

