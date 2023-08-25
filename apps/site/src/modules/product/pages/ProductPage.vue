<template>
  <div>
    <PageTitle :links="links">{{ product?.title }}</PageTitle>

    <ProductCard v-if="product" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/layout/components/PageTitle.vue';
import ProductCard from '@/product/components/ProductCard.vue';

import { getProduct } from '@/product/services';
import { URL_MAIN } from '@/common/constants';
import { URL_PRODUCT } from '@/product/constants';
import { URL_CATEGORY } from '@/category/constants';

const route = useRoute();

const productId = computed(() => route.params.id.toString());

const { data: product } = getProduct(productId);

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: `${URL_CATEGORY}`, title: 'Categories' },
  { url: `${URL_CATEGORY}/${product.value?.category._id}`, title: product.value?.category.title },
  {
    url: `${URL_CATEGORY}/${product.value?.category._id}${URL_PRODUCT}/${product.value?._id}`,
    title: product.value?.title,
  },
]);
</script>
