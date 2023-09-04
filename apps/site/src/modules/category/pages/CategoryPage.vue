<template>
  <div :class="$style.container">
    <div>
      <PageTitle :links="links">{{ category?.title }}</PageTitle>
      <CategoryCard v-if="category" :category="category" />
    </div>

    <div :class="$style.products">
      <ProductCatalogFilter />

      <div :class="$style.container">
        <ProductCatalogSort v-model="query.sort" :page="query.page" @reset="(value) => resetQuery(value)" />

        <ProductCatalogList v-if="products?.length" :products="products" />

        <UiPagination
          v-if="products?.length"
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
import CategoryCard from '@/category/components/CategoryCard.vue';
import ProductCatalogList from '@/product/components/ProductCatalogList.vue';
import ProductCatalogSort from '@/product/components/ProductCatalogSort.vue';
import ProductCatalogFilter from '@/product/components/ProductCatalogFilter.vue';

import { getCategory } from '@/category/services';
import { getProducts } from '@/product/services';
import { URL_MAIN } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';

const route = useRoute();

const categoryId = computed(() => route.params.category);

const { query, setQueryPage, resetQuery, setQueryFilter } = usePage({ category: categoryId.value });

const { data: category } = getCategory(categoryId);

const { data } = getProducts(query);

const { data: products, setPage, total } = usePagination(data);

watch(
  () => categoryId.value,
  () => {
    setQueryFilter({ category: categoryId.value });
  }
);

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: `${URL_CATEGORY}`, title: 'Categories' },
  { url: `${URL_CATEGORY}/${category.value?._id}`, title: category.value?.title },
]);

useHead({
  title: () => category.value?.title || 'Category',
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
