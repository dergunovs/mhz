<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <ManufacturerForm v-if="manufacturer" :manufacturer="manufacturer" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerForm from '@/manufacturer/components/ManufacturerForm.vue';

import { getManufacturer } from '@/manufacturer/services';
import { URL_MAIN } from '@/common/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

const route = useRoute();

const manufacturerId = computed(() => route.params.id.toString());

const { data: manufacturer } = getManufacturer(manufacturerId);

const title = 'Edit manufacturer';

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_MANUFACTURER, title: 'Manufacturers' },
  { url: route.path, title: manufacturer.value?.title },
]);

useHead({
  title,
});
</script>
