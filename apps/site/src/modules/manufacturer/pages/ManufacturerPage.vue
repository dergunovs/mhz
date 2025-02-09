<template>
  <div :class="$style.page">
    <PageTitle :links="links">
      {{ manufacturer?.title }} <span v-if="filters">({{ filters.manufacturer[0].count }} products)</span>
    </PageTitle>

    <ManufacturerCard v-if="manufacturer" :manufacturer="manufacturer" />

    <div :class="$style.products">
      <FullscreenFilters v-slot="{ hide }">
        <ProductCatalogFilter
          v-if="priceRange && filters"
          :filtersInitial="filters"
          :filtersBase="data?.filters"
          :priceRange="priceRange"
          :key="manufacturerId.toString()"
          @update="updateQuery"
          @hide="hide"
        />
      </FullscreenFilters>

      <div :class="$style.container">
        <div v-if="!products?.length && !isLoading">No such products. Please, change your filters.</div>

        <ProductCatalogSort v-else v-model="query.sort" :page="query.page" @reset="(value) => resetQuery(value)" />

        <ProductCatalogList v-if="products?.length" :products="products" />

        <UiPagination
          v-show="products?.length"
          :page="query.page"
          :total="total"
          @update="(value) => setQueryPage(setPaginationPage(value, query.page))"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { usePage, usePagination } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import FullscreenFilters from '@/layout/components/FullscreenFilters.vue';
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

const { data: products, setPaginationPage, total } = usePagination(data);

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
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: calc(100dvh - 128px);
}

.container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 32px;
}

.products {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

@media (max-width: $notebook) {
  .products {
    gap: 16px;
  }
}

@media (max-width: $mobile) {
  .products {
    flex-direction: column;
  }

  .container {
    width: 100%;
  }
}
</style>
