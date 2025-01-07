<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_MANUFACTURER_CREATE">Add manufacturer</RouterLink>

      <ManufacturerList
        :manufacturers="manufacturers"
        v-model="query.sort"
        @reset="(value) => resetQuery(value)"
        data-test="manufacturer-list-page-list"
      />

      <UiPagination
        v-show="manufacturers?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPaginationPage(value, query.page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerList from '@/manufacturer/components/ManufacturerList.vue';

import { getManufacturers } from '@/manufacturer/services';
import { URL_MANUFACTURER, URL_MANUFACTURER_CREATE } from '@/manufacturer/constants';
import { URL_MAIN } from '@/common/constants';

const { query, resetQuery, setQueryPage } = usePage();

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
