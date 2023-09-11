<template>
  <div v-if="products?.length">
    <h2 v-if="props.isTitle">Recently watched products</h2>

    <ProductCatalogList :products="products" :isScroll="props.isScroll && products.length > 4" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';

import ProductCatalogList from '@/product/components/ProductCatalogList.vue';

import { getCustomerWatchedProducts } from '@/customer/services';

interface IProps {
  isScroll?: boolean;
  isTitle?: boolean;
}

const props = defineProps<IProps>();

const { data: products, refetch } = getCustomerWatchedProducts();

onBeforeUnmount(() => {
  refetch();
});
</script>
