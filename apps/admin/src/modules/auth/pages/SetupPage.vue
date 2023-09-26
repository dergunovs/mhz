<template>
  <div>
    <SetupForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { useAuth } from 'mhz-helpers';

import SetupForm from '@/auth/components/SetupForm.vue';

import { URL_MAIN } from '@/common/constants';

const { redirectIfAuth } = useAuth();

redirectIfAuth(URL_MAIN);

useHead({
  title: 'Setup',
});
</script>
