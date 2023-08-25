<template>
  <div>
    <PageTitle :links="links">{{ manufacturer?.title }}</PageTitle>

    <ManufacturerCard v-if="manufacturer" :manufacturer="manufacturer" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerCard from '@/manufacturer/components/ManufacturerCard.vue';

import { getManufacturer } from '@/manufacturer/services';
import { URL_MAIN } from '@/common/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

const route = useRoute();

const manufacturerId = computed(() => route.params.id.toString());

const { data: manufacturer } = getManufacturer(manufacturerId);

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: `${URL_MANUFACTURER}`, title: 'Manufacturers' },
  { url: `${URL_MANUFACTURER}/${manufacturer.value?._id}`, title: manufacturer.value?.title },
]);
</script>
