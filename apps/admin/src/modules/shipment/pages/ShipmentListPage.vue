<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div>Shipments</div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';

import { URL_SHIPMENT } from '@/shipment/constants';
import { URL_MAIN } from '@/common/constants';

const title = 'Shipments';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_SHIPMENT, title },
];

useHead({
  title,
});
</script>
