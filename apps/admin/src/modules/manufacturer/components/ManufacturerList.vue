<template>
  <UiTable :headers="tableHeaders">
    <tr v-for="manufacturer in props.manufacturers" :key="manufacturer._id">
      <td width="100%">
        <RouterLink :to="`${URL_MANUFACTURER_EDIT}/${manufacturer._id}`">
          <img
            :src="`${PATH_UPLOAD}/${manufacturer.logoUrl}`"
            :alt="manufacturer.title"
            :title="manufacturer.title"
            width="80"
            loading="lazy"
          />
        </RouterLink>
      </td>
      <td>
        {{ formatDate(manufacturer.date_created) }}
      </td>
      <td>
        <UiButton @click="mutate(manufacturer._id)" layout="plain">Delete</UiButton>
      </td>
    </tr>
  </UiTable>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';

import { IManufacturer } from 'mhz-types';
import { UiTable, UiButton, toast } from 'mhz-ui';
import { formatDate } from 'mhz-helpers';

import { deleteManufacturer } from '@/manufacturer/services';
import { API_MANUFACTURER, URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';
import { PATH_UPLOAD } from '@/common/constants';

interface IProps {
  manufacturers: IManufacturer[];
}

const props = defineProps<IProps>();

const tableHeaders = ['Manufacturer', 'Created', ''];

const queryClient = useQueryClient();

const { mutate } = deleteManufacturer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER], exact: true });
    toast.success('Manufacturer deleted');
  },
});
</script>
