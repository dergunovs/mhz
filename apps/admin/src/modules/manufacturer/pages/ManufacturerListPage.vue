<template>
  <div :class="$style.container">
    <div>
      <RouterLink :to="URL_MANUFACTURER_CREATE">Добавить производителя</RouterLink>
    </div>

    <ManufacturerList v-if="manufacturers?.length" :manufacturers="manufacturers" />
  </div>
</template>

<script setup lang="ts">
import ManufacturerList from '@/manufacturer/components/ManufacturerList.vue';

import { getManufacturers } from '@/manufacturer/services';
import { URL_MANUFACTURER_CREATE } from '@/manufacturer/constants';

const { data: manufacturers } = getManufacturers();
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
