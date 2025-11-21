<template>
  <div>
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
