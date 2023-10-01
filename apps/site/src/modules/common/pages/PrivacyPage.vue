<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';

const title = 'Privacy policy';

useHead({
  title,
});
</script>
