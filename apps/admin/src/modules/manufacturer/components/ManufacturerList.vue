<template>
  <UiTable
    :headers="tableHeaders"
    :isLoading="!props.manufacturers?.length"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @reset="(value) => emit('reset', value)"
  >
    <template v-if="props.manufacturers?.length">
      <tr v-for="manufacturer in props.manufacturers" :key="manufacturer._id">
        <td data-grow>
          <RouterLink :to="`${URL_MANUFACTURER_EDIT}/${manufacturer._id}`">
            {{ manufacturer.title }}
          </RouterLink>
        </td>
        <td data-no-wrap>
          {{ manufacturer.country }}
        </td>
        <td data-no-wrap>
          {{ formatDate(manufacturer.dateCreated) }}
        </td>
        <td data-no-wrap>
          {{ formatDate(manufacturer.dateUpdated) }}
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
import { formatDate, ISortOption } from 'mhz-helpers';

import { deleteManufacturer } from '@/manufacturer/services';
import { API_MANUFACTURER, URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';

interface IProps {
  manufacturers?: IManufacturer[];
  modelValue: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue', 'reset']);

const tableHeaders = [
  { value: 'title', title: 'Manufacturer' },
  { value: 'country', title: 'Country' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
  { title: '' },
];

const queryClient = useQueryClient();

const { mutate } = deleteManufacturer({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANUFACTURER, 1], exact: true });
    toast.success('Manufacturer deleted');
  },
});
</script>
