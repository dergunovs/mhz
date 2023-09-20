<template>
  <div :class="$style.list">
    <ManufacturerCatalogCard
      v-for="manufacturer in props.manufacturers"
      :key="manufacturer._id"
      :manufacturer="manufacturer"
    />
  </div>
</template>

<script setup lang="ts">
import { IManufacturer } from 'mhz-contracts';

import ManufacturerCatalogCard from '@/manufacturer/components/ManufacturerCatalogCard.vue';

interface IProps {
  manufacturers: IManufacturer[];
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px 16px;
}
</style>
