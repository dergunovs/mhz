<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <ProductForm />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import ProductForm from '@/product/components/ProductForm.vue';

import { URL_MAIN } from '@/common/constants';
import { URL_PRODUCT, URL_PRODUCT_CREATE } from '@/product/constants';

const title = 'Add product';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_PRODUCT, title: 'Products' },
  { url: URL_PRODUCT_CREATE, title },
];

useHead({
  title,
});
</script>
