<template>
  <div :class="$style.list">
    <ManufacturerCatalogCard
      v-for="manufacturer in props.manufacturers"
      :key="manufacturer._id"
      :manufacturer="manufacturer"
      :isShowTitle="props.isShowTitle"
    />
  </div>
</template>

<script setup lang="ts">
import { IManufacturer } from 'mhz-contracts';

import ManufacturerCatalogCard from '@/manufacturer/components/ManufacturerCatalogCard.vue';

interface IProps {
  manufacturers: IManufacturer[];
  isShowTitle?: boolean;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 48px 16px;
}

@media (max-width: $mobile) {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
