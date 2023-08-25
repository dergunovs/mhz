<template>
  <div>
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

import LoginForm from '@/auth/components/LoginForm.vue';

import { isAuth } from '@/auth/composables';
import { URL_MAIN } from '@/common/constants';

const router = useRouter();

if (isAuth.value) router.push(URL_MAIN);

useHead({
  title: 'Login',
});
</script>
