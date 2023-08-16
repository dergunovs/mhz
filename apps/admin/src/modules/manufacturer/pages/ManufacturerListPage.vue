<template>
  <div>
    <PageTitle>Manufacturers</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_MANUFACTURER_CREATE">Add manufacturer</RouterLink>

      <ManufacturerList :manufacturers="manufacturers" v-model="query.sort" @reset="(value) => resetQuery(value)" />

      <UiPagination
        v-if="manufacturers?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPage(value, query.page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerList from '@/manufacturer/components/ManufacturerList.vue';

import { getManufacturers } from '@/manufacturer/services';
import { URL_MANUFACTURER, URL_MANUFACTURER_CREATE } from '@/manufacturer/constants';

const { query, resetQuery, setQueryPage } = usePage(URL_MANUFACTURER, 'title');

const { data } = getManufacturers(query);

const { data: manufacturers, total, setPage } = usePagination(data);
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
