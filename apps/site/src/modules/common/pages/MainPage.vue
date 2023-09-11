<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <CustomerWatchedProducts v-if="isAuth" isScroll isTitle />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import { isAuth } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import CustomerWatchedProducts from '@/customer/components/CustomerWatchedProducts.vue';

const title = 'Main page';

useHead({
  title,
});
</script>
