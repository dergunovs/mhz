<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <ManufacturerForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerForm from '@/manufacturer/components/ManufacturerForm.vue';

import { URL_MANUFACTURER, URL_MANUFACTURER_CREATE } from '@/manufacturer/constants';
import { URL_MAIN } from '@/common/constants';

const title = 'Add manufacturer';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_MANUFACTURER, title: 'Manufacturers' },
  { url: URL_MANUFACTURER_CREATE, title },
];

useHead({
  title,
});
</script>
