<template>
  <div>
    <ProductList v-if="products?.length" :products="products" />
  </div>
</template>

<script setup lang="ts">
import { usePage, usePagination } from 'mhz-helpers';

import { getProducts } from '@/product/services';
import ProductList from '@/product/components/ProductList.vue';

const { query } = usePage();

const { data } = getProducts(query);

const { data: products } = usePagination(data);
</script>
