<template>
  <div>
    <PageTitle :links="links">{{ manufacturer?.title }}</PageTitle>

    <ManufacturerCard v-if="manufacturer" :manufacturer="manufacturer" />

    <h2>Products</h2>

    <div :class="$style.products">
      <ProductCatalogList v-if="products?.length" :products="products" />

      <UiPagination
        v-if="products?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPage(value, query.page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { UiPagination } from 'mhz-ui';
import { usePage, usePagination } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerCard from '@/manufacturer/components/ManufacturerCard.vue';
import ProductCatalogList from '@/product/components/ProductCatalogList.vue';

import { getManufacturer } from '@/manufacturer/services';
import { getProducts } from '@/product/services';
import { URL_MAIN } from '@/common/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

const route = useRoute();

const manufacturerId = computed(() => route.params.id.toString());

const { query, setQueryPage } = usePage({ manufacturer: manufacturerId.value });

const { data: manufacturer } = getManufacturer(manufacturerId);

const { data } = getProducts(query);

const { data: products, setPage, total } = usePagination(data);

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: `${URL_MANUFACTURER}`, title: 'Manufacturers' },
  { url: `${URL_MANUFACTURER}/${manufacturer.value?._id}`, title: manufacturer.value?.title },
]);
</script>

<style module lang="scss">
.products {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
