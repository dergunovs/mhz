<template>
  <div>
    <h2>Popular categories</h2>

    <CategoryCatalogList v-if="categories?.length" :categories="categories" />
  </div>
</template>

<script setup lang="ts">
import CategoryCatalogList from '@/category/components/CategoryCatalogList.vue';

import { getCategoriesPopular } from '@/category/services';

const { data: categories } = getCategoriesPopular();
</script>
