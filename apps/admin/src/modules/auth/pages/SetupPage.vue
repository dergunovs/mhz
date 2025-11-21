<template>
  <div>
    <SetupForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import SetupForm from '@/auth/components/SetupForm.vue';

useHead({
  title: 'Setup',
});
</script>
