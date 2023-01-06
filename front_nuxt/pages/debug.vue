<script lang="ts" setup>
import {useCookie} from "#imports";
import {User} from "~/helpers/api";

const token = useCookie('token');
const user = useCookie<User | ''>('user');
</script>

<template>
  <div>
    <p>user</p>
    <pre>{{user}}</pre>
    <p>token</p>
    <pre>{{token}}</pre>
  </div>
</template>

