<template>
  <div :class="$style.list">
    <CategoryCatalogCard v-for="category in props.categories" :key="category._id" :category="category" />
  </div>
</template>

<script setup lang="ts">
import { ICategory } from 'mhz-types';

import CategoryCatalogCard from '@/category/components/CategoryCatalogCard.vue';

interface IProps {
  categories: ICategory[];
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 64px 32px;
}
</style>
