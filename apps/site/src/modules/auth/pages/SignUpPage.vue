<template>
  <div :class="$style.page">
    <SignUpForm />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

import { isAuth } from 'mhz-helpers';

import SignUpForm from '@/auth/components/SignUpForm.vue';

import { URL_MAIN } from '@/common/constants';

const router = useRouter();

if (isAuth.value) router.push(URL_MAIN);

useHead({
  title: 'Setup',
});
</script>

<style module lang="scss">
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
