<template>
  <div>
    <PageTitle>Производители</PageTitle>

    <div :class="$style.linkBlock">
      <RouterLink :to="URL_MANUFACTURER_CREATE">Добавить производителя</RouterLink>
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
.linkBlock {
  margin-bottom: 32px;
}
</style>
