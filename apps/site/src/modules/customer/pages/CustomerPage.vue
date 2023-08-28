<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <div>{{ customer }}</div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';

import { getCurrentCustomer } from '@/customer/services';

const { data: customer } = getCurrentCustomer();

const title = 'Customer info';

useHead({
  title,
});
</script>
