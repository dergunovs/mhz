<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <div :class="$style.page">
      <ConfigurationForm
        v-if="categories && currentCategory"
        @update="updateCategory"
        :categories="categories"
        :currentCategory="currentCategory"
        :choosenProduct="choosenProduct"
        isAuthor
      />

      <div :class="$style.products">
        <ProductCatalogFilter
          v-if="priceRange && filters"
          :filtersInitial="filters"
          :filtersBase="data?.filters"
          :priceRange="priceRange"
          :key="currentCategory"
          isCategory
          @update="updateQuery"
        />

        <div :class="$style.container">
          <div v-if="!products?.length && !isLoading">No such products. Please, change your filters</div>

          <ProductCatalogSort
            v-show="products?.length"
            v-model="query.sort"
            :page="query.page"
            @reset="(value) => resetQuery(value)"
          />

          <ProductCatalogList v-if="products?.length" :products="products" isConfiguration @choice="handleChoice" />

          <UiPagination
            v-show="products?.length"
            :page="query.page"
            :total="total"
            @update="(value) => setQueryPage(setPage(value, query.page))"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { clone, usePage, usePagination } from 'mhz-helpers';
import { ICategory, IProduct } from 'mhz-types';

import PageTitle from '@/layout/components/PageTitle.vue';
import ConfigurationForm from '@/configuration/components/ConfigurationForm.vue';
import ProductCatalogList from '@/product/components/ProductCatalogList.vue';
import ProductCatalogSort from '@/product/components/ProductCatalogSort.vue';
import ProductCatalogFilter from '@/product/components/ProductCatalogFilter.vue';

import { getProductFilters, getProductPriceRange, getProducts } from '@/product/services';
import { getCategories } from '@/category/services';

const currentCategory = ref<string>();
const choosenProduct = ref<IProduct>();

const isCurrentCategory = ref(false);

const { data: categories } = getCategories({
  refetchOnMount: true,
  onSuccess: (data: ICategory[]) => {
    updateCategory(data.find((category) => category.title === 'Motherboard')?._id);
    isCurrentCategory.value = true;
  },
});

const { query, setQueryPage, resetQuery, setQueryFilter } = usePage({ category: [currentCategory.value] });

const { data, isLoading } = getProducts(query, 'category', isCurrentCategory);

const { data: products, setPage, total } = usePagination(data);

const { data: priceRange } = getProductPriceRange('category', currentCategory);
const { data: filters } = getProductFilters('category', currentCategory);

function updateCategory(id?: string) {
  currentCategory.value = id;
  setQueryFilter({ category: [id] });
}

function updateQuery(filtersToSet: object) {
  setQueryFilter({ ...filtersToSet, category: [currentCategory.value] });
}

function handleChoice(choice: IProduct) {
  choosenProduct.value = clone(choice);
  document.querySelector('main')?.scrollTo(0, 0);
}

const title = 'Create PC configuration';

useHead({
  title,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: 100vh;
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
</style>