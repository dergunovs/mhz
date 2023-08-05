<template>
  <div>
    <PageTitle>Manufacturers</PageTitle>

    <div :class="$style.link">
      <RouterLink :to="URL_MANUFACTURER_CREATE">Add manufacturer</RouterLink>
    </div>

    <ManufacturerList v-if="manufacturers?.length" :manufacturers="manufacturers" />
  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerList from '@/manufacturer/components/ManufacturerList.vue';

import { getManufacturers } from '@/manufacturer/services';
import { URL_MANUFACTURER_CREATE } from '@/manufacturer/constants';

const { data: manufacturers } = getManufacturers();
</script>

<style module lang="scss">
.link {
  margin-bottom: 32px;
}
</style>
