<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <EntitiesCount />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import EntitiesCount from '@/common/components/EntitiesCount.vue';

import { URL_MAIN } from '@/common/constants';

const title = 'Main';

const links = [{ url: URL_MAIN, title }];

useHead({
  title,
});
</script>
