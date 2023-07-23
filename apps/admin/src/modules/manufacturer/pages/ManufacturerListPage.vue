<template>
  <div :class="$style.container">
    <RouterLink :to="URL_MANUFACTURER_CREATE">Добавить производителя</RouterLink>

    <UiTable :headers="tableHeaders">
      <tr v-for="manufacturer in manufacturers" :key="manufacturer._id">
        <td>
          {{ manufacturer.title }}
        </td>
        <td>
          {{ manufacturer.logoUrl }}
        </td>
        <td>
          {{ manufacturer.date_created }}
        </td>
        <td>
          <UiButton @click="mutate(manufacturer._id)" layout="plain"> Удалить</UiButton>
        </td>
      </tr>
    </UiTable>
  </div>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';

import { UiTable, UiButton } from 'mhz-ui';

import { getManufacturers, deleteManufacturer } from '@/manufacturer/services';
import { URL_MANUFACTURER_CREATE, API_MANUFACTURER } from '@/manufacturer/constants';

const queryClient = useQueryClient();

const { data: manufacturers } = getManufacturers();

const { mutate } = deleteManufacturer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER], exact: true });
  },
});

const tableHeaders = ['Название', 'Логотип', 'Дата создания', ''];
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
