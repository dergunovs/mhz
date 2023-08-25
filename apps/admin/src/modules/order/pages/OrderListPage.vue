<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div>Orders</div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';

import { URL_ORDER } from '@/order/constants';
import { URL_MAIN } from '@/common/constants';

const title = 'Orders';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_ORDER, title },
];

useHead({
  title,
});
</script>
