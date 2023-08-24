<template>
  <div>
    <ProductCard v-if="product" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import ProductCard from '@/product/components/ProductCard.vue';

import { getProduct } from '@/product/services';

const route = useRoute();

const productId = computed(() => route.params.id.toString());

const { data: product } = getProduct(productId);
</script>
