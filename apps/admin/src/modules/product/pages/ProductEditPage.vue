<template>
  <div>
    <PageTitle :links="links">Edit product</PageTitle>

    <ProductForm v-if="product" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/layout/components/PageTitle.vue';
import ProductForm from '@/product/components/ProductForm.vue';

import { getProduct } from '@/product/services';
import { URL_MAIN } from '@/common/constants';
import { URL_PRODUCT } from '@/product/constants';

const route = useRoute();

const productId = computed(() => route.params.id.toString());

const { data: product } = getProduct(productId);

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_PRODUCT, title: 'Products' },
  { url: route.path, title: product.value?.title },
]);
</script>
