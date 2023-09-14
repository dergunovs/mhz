<template>
  <div :class="$style.page">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

import { isAuth } from 'mhz-helpers';

import LoginForm from '@/auth/components/LoginForm.vue';

import { URL_MAIN } from '@/common/constants';

const router = useRouter();

if (isAuth.value) router.push(URL_MAIN);

useHead({
  title: 'Login',
});
</script>

<style module lang="scss">
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
