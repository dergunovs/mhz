<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div :class="$style.page">
      <ManufacturerCatalogList v-if="manufacturers?.length" :manufacturers="manufacturers" />

      <UiPagination
        v-if="manufacturers?.length"
        :page="query.page"
        :total="total"
        @update="(value: number) => setQueryPage(setPage(value, query.page))"
      />
    </div>
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

const { data: manufacturers, total, setPage } = usePagination(data);

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
