<template>
  <div v-if="products?.length">
    <h2>Recently watched products</h2>

    <ProductCatalogList :products="products" :isScroll="products.length > 4" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';

import ProductCatalogList from '@/product/components/ProductCatalogList.vue';

import { getCustomerWatchedProducts } from '@/customer/services';

const { data: products, refetch } = getCustomerWatchedProducts();

onBeforeUnmount(() => {
  refetch();
});
</script>
