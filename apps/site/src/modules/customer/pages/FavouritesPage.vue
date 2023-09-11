<template>
  <div>
    <ProductCatalogList v-if="products?.length" :products="products" />
  </div>
</template>

<script setup lang="ts">
import ProductCatalogList from '@/product/components/ProductCatalogList.vue';

import { getCustomerFavouriteProducts } from '@/customer/services';

const { data: products } = getCustomerFavouriteProducts();
</script>
