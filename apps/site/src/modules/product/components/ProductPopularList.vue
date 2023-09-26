<template>
  <div>
    <h2>Popular products</h2>

    <ProductCatalogList v-if="products?.length" :products="products" />
  </div>
</template>

<script setup lang="ts">
import ProductCatalogList from '@/product/components/ProductCatalogList.vue';

import { getProductsPopular } from '@/product/services';

const { data: products } = getProductsPopular();
</script>
