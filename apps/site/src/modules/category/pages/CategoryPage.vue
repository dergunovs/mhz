<template>
  <div :class="$style.page">
    <PageTitle :links="links">
      {{ category?.title }} <span v-if="filters">({{ filters.category[0].count }} products)</span>
    </PageTitle>

    <CategoryCard v-if="category" :category="category" />

    <div :class="$style.products">
      <div :class="$style.showFiltersButtons">
        <UiButton @click="toggleFilters" :icon="IconFilter" layout="plain">Show filters</UiButton>
      </div>

      <div :class="[$style.filters, isShowFilters && $style.filtersVisible]">
        <ProductCatalogFilter
          v-if="priceRange && filters"
          :filtersInitial="filters"
          :filtersBase="data?.filters"
          :priceRange="priceRange"
          :key="categoryId.toString()"
          isCategory
          @update="updateQuery"
          @hideFilters="toggleFilters"
        />
      </div>

      <div :class="$style.container">
        <div v-if="!products?.length && !isLoading">No such products. Please, change your filters</div>

        <ProductCatalogSort
          v-show="products?.length"
          v-model="query.sort"
          :page="query.page"
          @reset="(value: string) => resetQuery(value)"
        />

        <ProductCatalogList v-if="products?.length" :products="products" />

        <UiPagination
          v-show="products?.length"
          :page="query.page"
          :total="total"
          @update="(value: number) => setQueryPage(setPage(value, query.page))"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

import { UiButton, UiPagination } from 'mhz-ui';
import { usePage, usePagination } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryCard from '@/category/components/CategoryCard.vue';
import ProductCatalogList from '@/product/components/ProductCatalogList.vue';
import ProductCatalogSort from '@/product/components/ProductCatalogSort.vue';
import ProductCatalogFilter from '@/product/components/ProductCatalogFilter.vue';

import IconFilter from '@/layout/icons/filters.svg?component';

import { getCategory } from '@/category/services';
import { getProducts, getProductPriceRange, getProductFilters } from '@/product/services';
import { URL_MAIN } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';

const route = useRoute();

const isShowFilters = ref(false);

const categoryId = computed(() => route.params.category);

const { query, setQueryPage, resetQuery, setQueryFilter } = usePage({ category: [categoryId.value] });

const { data: category } = getCategory(categoryId);

const { data, isLoading } = getProducts(query, 'category');

const { data: products, setPage, total } = usePagination(data);

const { data: priceRange } = getProductPriceRange('category', categoryId);
const { data: filters } = getProductFilters('category', categoryId);

function updateQuery(filtersToSet: object) {
  setQueryFilter({ category: [categoryId.value], ...filtersToSet });
}

watch(
  () => categoryId.value,
  () => {
    setQueryFilter({ category: [categoryId.value] });
  }
);

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: `${URL_CATEGORY}`, title: 'Categories' },
  { url: `${URL_CATEGORY}/${category.value?._id}`, title: category.value?.title },
]);

function toggleFilters() {
  isShowFilters.value = !isShowFilters.value;
}

useHead({
  title: () => category.value?.title || 'Category',
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: calc(100vh - 128px);
}

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

.showFiltersButtons {
  display: none;
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

  .showFiltersButtons {
    display: block;
  }

  .filters {
    display: none;

    &.filtersVisible {
      position: absolute;
      inset: 0;
      z-index: 999;
      display: flex;
      width: 100%;
      height: 100vh;
      padding: 32px 16px 104px 16px;
      overflow-y: hidden;
      background: var(--color-white);
    }
  }

  .container {
    width: 100%;
  }
}
</style>
