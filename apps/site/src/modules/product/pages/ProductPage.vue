<template>
  <div v-if="product" :class="$style.product">
    <PageTitle :links="links">{{ product.title }}</PageTitle>

    <ProductCard :product="product" />

    <CustomerWatchedProducts v-if="isAuth" isScroll isTitle />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

import { isAuth } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import ProductCard from '@/product/components/ProductCard.vue';
import CustomerWatchedProducts from '@/customer/components/CustomerWatchedProducts.vue';

import { getProduct } from '@/product/services';
import { URL_MAIN } from '@/common/constants';
import { URL_PRODUCT } from '@/product/constants';
import { URL_CATEGORY } from '@/category/constants';

const route = useRoute();

const productId = computed(() => route.params.product);

const { data: product } = getProduct(productId);

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: `${URL_CATEGORY}`, title: 'Categories' },
  { url: `${URL_CATEGORY}/${product.value?.category._id}`, title: product.value?.category.title },
  { url: `${URL_PRODUCT}/${product.value?._id}`, title: product.value?.title },
]);

watch(
  () => productId.value,
  () => {
    document.querySelector('main')?.scrollTo(0, 0);
  }
);

useHead({
  title: () => product.value?.title || 'Product',
});
</script>

<style module lang="scss">
.product {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
