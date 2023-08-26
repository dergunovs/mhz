<template>
  <div>
    <ProductCatalogList v-if="products?.length" :products="products" isScroll />
  </div>
</template>

<script setup lang="ts">
import { usePage, usePagination } from 'mhz-helpers';

import ProductCatalogList from '@/product/components/ProductCatalogList.vue';

import { getProducts } from '@/product/services';

const { query } = usePage();

const { data } = getProducts(query);

const { data: products } = usePagination(data);
</script>
