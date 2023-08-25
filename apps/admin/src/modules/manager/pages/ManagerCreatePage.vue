<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <ManagerForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManagerForm from '@/manager/components/ManagerForm.vue';

import { URL_MANAGER, URL_MANAGER_CREATE } from '@/manager/constants';
import { URL_MAIN } from '@/common/constants';

const title = 'Add manager';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_MANAGER, title: 'Managers' },
  { url: URL_MANAGER_CREATE, title },
];

useHead({
  title,
});
</script>
