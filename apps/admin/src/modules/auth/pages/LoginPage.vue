<template>
  <div :class="$style.container">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import LoginForm from '@/auth/components/LoginForm.vue';

import { isAuth } from '@/auth/composables';
import { URL_MAIN } from '@/common/constants';

const router = useRouter();

if (isAuth.value) router.push(URL_MAIN);
</script>

<style module lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
