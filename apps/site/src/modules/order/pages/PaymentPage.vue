<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <div>Iframe</div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';

const title = 'Payment';

useHead({
  title,
});
</script>
