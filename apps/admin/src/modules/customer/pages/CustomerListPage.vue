<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div>Customers</div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';

import { URL_CUSTOMER } from '@/customer/constants';
import { URL_MAIN } from '@/common/constants';

const title = 'Customers';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_CUSTOMER, title },
];

useHead({
  title,
});
</script>
