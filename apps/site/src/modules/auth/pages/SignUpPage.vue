<template>
  <div :class="$style.page">
    <SignUpForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { useAuth } from 'mhz-helpers';

import SignUpForm from '@/auth/components/SignUpForm.vue';

import { URL_MAIN } from '@/common/constants';

const { redirectIfAuth } = useAuth();

redirectIfAuth(URL_MAIN);

useHead({
  title: 'Sign up',
});
</script>

<style module lang="scss">
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
