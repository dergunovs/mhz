<template>
  <UiTable
    :headers="tableHeaders"
    :isLoading="!props.manufacturers?.length"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @reset="(value) => emit('reset', value)"
    lang="en"
  >
    <template v-if="props.manufacturers?.length">
      <tr v-for="manufacturer in props.manufacturers" :key="manufacturer._id" data-test="manufacturer-list-row">
        <td data-grow>
          <RouterLink :to="`${URL_MANUFACTURER_EDIT}/${manufacturer._id}`" data-test="manufacturer-list-link">
            {{ manufacturer.title }}
          </RouterLink>
        </td>
        <td data-no-wrap>
          {{ manufacturer.country }}
        </td>
        <td>
          {{ manufacturer.views }}
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
import { IManufacturer } from 'mhz-contracts';
import { UiTable } from 'mhz-ui';
import { formatDate, ISortOption } from 'mhz-helpers';

import { URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';

interface IProps {
  manufacturers?: IManufacturer[];
  modelValue?: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ 'update:modelValue': [value: ISortOption]; reset: [value: string] }>();

const tableHeaders = [
  { value: 'title', title: 'Manufacturer' },
  { value: 'country', title: 'Country' },
  { value: 'views', title: 'Views' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
];
</script>
