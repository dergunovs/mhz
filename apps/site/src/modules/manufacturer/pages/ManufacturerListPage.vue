<template>
  <div :class="$style.page">
    <PageTitle :links="links">{{ title }}</PageTitle>

    <ManufacturerCatalogList v-if="manufacturers?.length" :manufacturers="manufacturers" isShowTitle />

    <UiPagination
      v-if="manufacturers?.length"
      :page="query.page"
      :total="total"
      @update="(value) => setQueryPage(setPaginationPage(value, query.page))"
    />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerCatalogList from '@/manufacturer/components/ManufacturerCatalogList.vue';

import { getManufacturers } from '@/manufacturer/services';
import { URL_MANUFACTURER } from '@/manufacturer/constants';
import { URL_MAIN } from '@/common/constants';

const { query, setQueryPage } = usePage();

const { data } = getManufacturers(query);

const { data: manufacturers, total, setPaginationPage } = usePagination(data);

const title = 'Manufacturers';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_MANUFACTURER, title },
];

useHead({
  title,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
