<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <ProductForm v-if="product" :product="product" data-test="product-edit-page-form" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import ProductForm from '@/product/components/ProductForm.vue';

import { getProduct } from '@/product/services';
import { URL_MAIN } from '@/common/constants';
import { URL_PRODUCT } from '@/product/constants';

const route = useRoute();

const productId = computed(() => route.params.product);

const { data: product } = getProduct(productId);

const title = 'Edit product';

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_PRODUCT, title: 'Products' },
  { url: route.path, title: product.value?.title || '' },
]);

useHead({
  title,
});
</script>
