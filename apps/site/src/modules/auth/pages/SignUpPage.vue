<template>
  <div>
    <SignUpForm />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

import { isAuth } from 'mhz-helpers';

import SignUpForm from '@/auth/components/SignUpForm.vue';

import { URL_MAIN } from '@/common/constants';

const router = useRouter();

if (isAuth.value) router.push(URL_MAIN);

useHead({
  title: 'Setup',
});
</script>
