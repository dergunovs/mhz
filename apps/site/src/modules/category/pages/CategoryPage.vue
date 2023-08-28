<template>
  <div>
    <PageTitle :links="links">{{ category?.title }}</PageTitle>

    <CategoryCard v-if="category" :category="category" />

    <h2>Products</h2>

    <div v-if="products?.length" :class="$style.products">
      <ProductCatalogList :products="products" />

      <UiPagination :page="query.page" :total="total" @update="(value) => setQueryPage(setPage(value, query.page))" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

import { UiPagination } from 'mhz-ui';
import { usePage, usePagination } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import CategoryCard from '@/category/components/CategoryCard.vue';
import ProductCatalogList from '@/product/components/ProductCatalogList.vue';

import { getCategory } from '@/category/services';
import { getProducts } from '@/product/services';
import { URL_MAIN } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';

const route = useRoute();

const categoryId = computed(() => route.params.id.toString());

const { query, setQueryPage } = usePage({ category: categoryId.value });

const { data: category } = getCategory(categoryId);

const { data } = getProducts(query);

const { data: products, setPage, total } = usePagination(data);

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
.products {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
