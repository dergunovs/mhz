<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div>Main</div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';

import { URL_MAIN } from '@/common/constants';

const title = 'Main';

const links = [{ url: URL_MAIN, title }];

useHead({
  title,
});
</script>
