<template>
  <div :class="$style.page">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import LoginForm from '@/auth/components/LoginForm.vue';

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
