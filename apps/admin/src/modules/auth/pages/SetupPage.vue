<template>
  <div :class="$style.container">
    <SetupForm />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import SetupForm from '@/auth/components/SetupForm.vue';

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
