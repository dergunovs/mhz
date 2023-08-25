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
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { IManufacturer } from 'mhz-types';
import { UiTable } from 'mhz-ui';
import { formatDate, ISortOption } from 'mhz-helpers';

import { URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';

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
];
</script>
