<template>
  <div :class="$style.page">
    <PageTitle>{{ title }}</PageTitle>

    <ProductPopularList />

    <CategoryPopularList />

    <ManufacturerPopularList />

    <CustomerWatchedProducts v-if="isAuth" isScroll isTitle />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { isAuth } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import CustomerWatchedProducts from '@/customer/components/CustomerWatchedProducts.vue';
import ProductPopularList from '@/product/components/ProductPopularList.vue';
import CategoryPopularList from '@/category/components/CategoryPopularList.vue';
import ManufacturerPopularList from '@/manufacturer/components/ManufacturerPopularList.vue';

const title = 'Main page';

useHead({
  title,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
