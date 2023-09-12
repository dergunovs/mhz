<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <div id="bank"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useHead } from '@vueuse/head';

import { createBankPayment } from 'mhz-bank';

import PageTitle from '@/layout/components/PageTitle.vue';

onMounted(() => {
  createBankPayment('bank');
});

const title = 'Payment';

useHead({
  title,
});
</script>
