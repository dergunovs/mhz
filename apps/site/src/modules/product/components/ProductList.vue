<template>
  <div :class="$style.list">
    <ProductCard v-for="product in props.products" :key="product._id" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { IProduct } from 'mhz-types';

import ProductCard from '@/product/components/ProductCard.vue';

interface IProps {
  products: IProduct[];
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
</style>
