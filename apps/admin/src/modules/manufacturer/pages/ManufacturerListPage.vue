<template>
  <div>
    <PageTitle>Manufacturers</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_MANUFACTURER_CREATE">Add manufacturer</RouterLink>

      <ManufacturerList :manufacturers="manufacturers" />

      <UiPagination v-if="manufacturers?.length" :page="page" :total="total" @update="updatePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiPagination } from 'mhz-ui';
import { usePagination } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerList from '@/manufacturer/components/ManufacturerList.vue';

import { getManufacturers } from '@/manufacturer/services';
import { URL_MANUFACTURER_CREATE } from '@/manufacturer/constants';

const page = ref(1);

const { data } = getManufacturers(page);

const { data: manufacturers, total, setPage } = usePagination(data);

function updatePage(pageToSet: number) {
  page.value = setPage(pageToSet, page.value);
}
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
