<template>
  <div :class="$style.page">
    <SignUpForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import SignUpForm from '@/auth/components/SignUpForm.vue';

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
