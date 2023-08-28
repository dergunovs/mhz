<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';

const title = 'Main page';

useHead({
  title,
});
</script>
