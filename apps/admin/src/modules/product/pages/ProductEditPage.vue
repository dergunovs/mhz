<template>
  <div>
    <PageTitle>Edit product</PageTitle>

    <ProductForm v-if="product" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/layout/components/PageTitle.vue';
import ProductForm from '@/product/components/ProductForm.vue';

import { getProduct } from '@/product/services';

const route = useRoute();

const productId = computed(() => route.params.id.toString());

const { data: product } = getProduct(productId);
</script>
