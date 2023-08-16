<template>
  <div>
    <PageTitle>Products</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_PRODUCT_CREATE">Add product</RouterLink>

      <ProductList :products="products" v-model="query.sort" @reset="(value) => resetQuery(value)" />

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
import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ProductList from '@/product/components/ProductList.vue';

import { getProducts } from '@/product/services';
import { URL_PRODUCT_CREATE } from '@/product/constants';

const { query, resetQuery, setQueryPage } = usePage();

const { data } = getProducts(query);

const { data: products, total, setPage } = usePagination(data);
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
