<template>
  <div :class="$style.page">
    <div :class="$style.top">
      <ConfigurationAd />
      <BannerSlider />
    </div>

    <ProductPopularList />

    <CategoryPopularList />

    <ManufacturerPopularList />

    <CustomerWatchedProducts v-if="isAuth" isScroll isTitle />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { isAuth } from 'mhz-helpers';

import ConfigurationAd from '@/configuration/components/ConfigurationAd.vue';
import BannerSlider from '@/banner/components/BannerSlider.vue';
import CustomerWatchedProducts from '@/customer/components/CustomerWatchedProducts.vue';
import ProductPopularList from '@/product/components/ProductPopularList.vue';
import CategoryPopularList from '@/category/components/CategoryPopularList.vue';
import ManufacturerPopularList from '@/manufacturer/components/ManufacturerPopularList.vue';

useHead({
  title: 'Main page',
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.top {
  display: flex;
  gap: 16px;
}
</style>
