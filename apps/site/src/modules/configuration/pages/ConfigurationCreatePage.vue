<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <ConfigurationForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';
import ConfigurationForm from '@/configuration/components/ConfigurationForm.vue';

const title = 'Create PC configuration';

useHead({
  title,
});
</script>
