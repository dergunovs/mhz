<template>
  <div>
    <PageTitle>Products</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_PRODUCT_CREATE">Add product</RouterLink>

      <ProductList :products="products" />

      <UiPagination v-if="products?.length" :page="page" :total="total" @update="updatePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ProductList from '@/product/components/ProductList.vue';

import { getProducts } from '@/product/services';
import { URL_PRODUCT, URL_PRODUCT_CREATE } from '@/product/constants';

const { page } = usePage(URL_PRODUCT);

const { data } = getProducts(page);

const { data: products, total, setPage } = usePagination(data);

function updatePage(pageToSet: number) {
  page.value = setPage(pageToSet, page.value);
}
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
