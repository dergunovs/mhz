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
import { ICategory } from 'mhz-contracts';

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
  grid-template-columns: repeat(6, 1fr);
  gap: 48px 16px;

  &[data-header='true'] {
    grid-template-columns: repeat(1, 1fr);
    gap: 8px;
  }
}

@media (max-width: $tablet) {
  .list {
    &[data-header='true'] {
      gap: 4px;
    }
  }
}

@media (max-width: $mobile) {
  .list {
    grid-template-columns: repeat(2, 1fr);

    &[data-header='true'] {
      gap: 8px;
    }
  }
}
</style>
