<template>
  <div :class="$style.container">
    <div>
      <PageTitle :links="links">{{ manufacturer?.title }}</PageTitle>
      <ManufacturerCard v-if="manufacturer" :manufacturer="manufacturer" />
    </div>

    <div :class="$style.products">
      <ProductCatalogFilter
        v-if="priceRange && filters"
        :filtersInitial="filters"
        :filtersBase="data?.filters"
        :priceRange="priceRange"
        :key="manufacturerId.toString()"
        @update="updateQuery"
      />

      <div :class="$style.container">
        <div v-if="!products?.length && !isLoading">No such product. Please, change your filters</div>

        <ProductCatalogSort
          v-show="products?.length"
          v-model="query.sort"
          :page="query.page"
          @reset="(value) => resetQuery(value)"
        />

        <ProductCatalogList v-if="products?.length" :products="products" />

        <UiPagination
          v-show="products?.length"
          :page="query.page"
          :total="total"
          @update="(value) => setQueryPage(setPage(value, query.page))"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

import { UiPagination } from 'mhz-ui';
import { usePage, usePagination } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerCard from '@/manufacturer/components/ManufacturerCard.vue';
import ProductCatalogList from '@/product/components/ProductCatalogList.vue';
import ProductCatalogSort from '@/product/components/ProductCatalogSort.vue';
import ProductCatalogFilter from '@/product/components/ProductCatalogFilter.vue';

import { getManufacturer } from '@/manufacturer/services';
import { getProducts, getProductPriceRange, getProductFilters } from '@/product/services';
import { URL_MAIN } from '@/common/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

const route = useRoute();

const manufacturerId = computed(() => route.params.manufacturer);

const { query, setQueryPage, resetQuery, setQueryFilter } = usePage({ manufacturer: [manufacturerId.value] });

const { data: manufacturer } = getManufacturer(manufacturerId);

const { data, isLoading } = getProducts(query, 'manufacturer');

const { data: products, setPage, total } = usePagination(data);

const { data: priceRange } = getProductPriceRange('manufacturer', manufacturerId);
const { data: filters } = getProductFilters('manufacturer', manufacturerId);

function updateQuery(filtersToSet: object) {
  setQueryFilter({ manufacturer: [manufacturerId.value], ...filtersToSet });
}

watch(
  () => manufacturerId.value,
  () => {
    setQueryFilter({ category: [manufacturerId.value] });
  }
);

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: `${URL_MANUFACTURER}`, title: 'Manufacturers' },
  { url: `${URL_MANUFACTURER}/${manufacturer.value?._id}`, title: manufacturer.value?.title },
]);

useHead({
  title: () => manufacturer.value?.title || 'Manufacturer',
});
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 32px;
}

.products {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}
</style>
