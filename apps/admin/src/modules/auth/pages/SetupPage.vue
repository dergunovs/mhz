<template>
  <div>
    <SetupForm />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

import { isAuth } from 'mhz-helpers';

import SetupForm from '@/auth/components/SetupForm.vue';

import { URL_MAIN } from '@/common/constants';

const router = useRouter();

if (isAuth.value) router.push(URL_MAIN);

useHead({
  title: 'Setup',
});
</script>
