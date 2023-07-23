<template>
  <div>
    <div>Список производителей</div>
    <RouterLink :to="URL_MANUFACTURER_CREATE">Создать</RouterLink>

    <div v-for="(manufacturer, index) in manufacturers" :key="manufacturer._id">
      {{ manufacturer._id }} - {{ index + 1 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getManufacturers } from '@/manufacturer/services';
import { URL_MANUFACTURER_CREATE, API_MANUFACTURER } from '@/manufacturer/constants';
import { useInvalidate } from '@/common/composables';

const { data: manufacturers } = getManufacturers();

const { invalidate } = useInvalidate(API_MANUFACTURER);

invalidate();
</script>
