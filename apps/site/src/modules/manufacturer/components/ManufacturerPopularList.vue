<template>
  <div>
    <h2>Popular manufacturer</h2>

    <ManufacturerCatalogList v-if="manufacturers?.length" :manufacturers="manufacturers" />
  </div>
</template>

<script setup lang="ts">
import ManufacturerCatalogList from '@/manufacturer/components/ManufacturerCatalogList.vue';

import { getManufacturersPopular } from '@/manufacturer/services';

const { data: manufacturers } = getManufacturersPopular();
</script>
