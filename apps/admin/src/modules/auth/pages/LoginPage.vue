<template>
  <div>
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { useAuth } from 'mhz-helpers';

import LoginForm from '@/auth/components/LoginForm.vue';

import { URL_MAIN } from '@/common/constants';

const { redirectIfAuth } = useAuth();

redirectIfAuth(URL_MAIN);

useHead({
  title: 'Login',
});
</script>
