<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div :class="$style.page">
      <RouterLink :to="URL_PRODUCT_CREATE">Add product</RouterLink>

      <ProductList
        :products="products"
        v-model="query.sort"
        @reset="(value) => resetQuery(value)"
        data-test="product-list-page-list"
      />

      <UiPagination
        v-show="products?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPaginationPage(value, query.page))"
        lang="en"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ProductList from '@/product/components/ProductList.vue';

import { getProducts } from '@/product/services';
import { URL_PRODUCT, URL_PRODUCT_CREATE } from '@/product/constants';
import { URL_MAIN } from '@/common/constants';

const { query, resetQuery, setQueryPage } = usePage();

const { data } = getProducts(query);

const { data: products, total, setPaginationPage } = usePagination(data);

const title = 'Products';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_PRODUCT, title },
];

useHead({
  title,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
