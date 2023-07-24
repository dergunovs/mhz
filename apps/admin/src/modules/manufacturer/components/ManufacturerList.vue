<template>
  <UiTable :headers="tableHeaders">
    <tr v-for="manufacturer in props.manufacturers" :key="manufacturer._id">
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
        <UiButton @click="mutate(manufacturer._id)" layout="plain">Удалить</UiButton>
      </td>
    </tr>
  </UiTable>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';

import { IManufacturer } from 'mhz-types';
import { UiTable, UiButton, toast } from 'mhz-ui';

import { deleteManufacturer } from '@/manufacturer/services';
import { API_MANUFACTURER } from '@/manufacturer/constants';

interface IProps {
  manufacturers: IManufacturer[];
}

const props = defineProps<IProps>();

const tableHeaders = ['Название', 'Логотип', 'Дата создания', ''];

const queryClient = useQueryClient();

const { mutate } = deleteManufacturer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER], exact: true });
    toast.success('Производитель удален');
  },
});
</script>
