<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <div>Error</div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';

const title = 'Error';

useHead({
  title,
});
</script>
