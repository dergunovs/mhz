<template>
  <div :class="$style.list" :data-header="props.isHeader">
    <CategoryCatalogCard
      v-for="category in props.categories"
      :key="category._id"
      :category="category"
      :isHeader="props.isHeader"
    />
  </div>
</template>

<script setup lang="ts">
import { ICategory } from 'mhz-types';

import CategoryCatalogCard from '@/category/components/CategoryCatalogCard.vue';

interface IProps {
  categories: ICategory[];
  isHeader?: boolean;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 64px 32px;

  &[data-header='true'] {
    grid-template-columns: repeat(1, 1fr);
    gap: 8px;
  }
}
</style>
