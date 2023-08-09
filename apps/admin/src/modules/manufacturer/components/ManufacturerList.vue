<template>
  <UiTable :headers="tableHeaders">
    <template v-if="props.manufacturers?.length">
      <tr v-for="manufacturer in props.manufacturers" :key="manufacturer._id">
        <td data-grow>
          <RouterLink :to="`${URL_MANUFACTURER_EDIT}/${manufacturer._id}`">
            {{ manufacturer.title }}
          </RouterLink>
        </td>
        <td data-no-wrap>
          {{ formatDateTime(manufacturer.date_created) }}
        </td>
        <td data-no-wrap>
          {{ formatDateTime(manufacturer.date_updated) }}
        </td>
        <td>
          <UiButton @click="mutate(manufacturer._id)" layout="plain">Delete</UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';

import { IManufacturer } from 'mhz-types';
import { UiTable, UiButton, toast } from 'mhz-ui';
import { formatDateTime } from 'mhz-helpers';

import { deleteManufacturer } from '@/manufacturer/services';
import { API_MANUFACTURER, URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';

interface IProps {
  manufacturers?: IManufacturer[];
}

const props = defineProps<IProps>();

const tableHeaders = ['Manufacturer', 'Created', 'Updated', ''];

const queryClient = useQueryClient();

const { mutate } = deleteManufacturer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER], exact: true });
    toast.success('Manufacturer deleted');
  },
});
</script>
