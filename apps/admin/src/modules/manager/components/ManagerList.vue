<template>
  <UiTable
    :headers="tableHeaders"
    :isLoading="!props.managers?.length"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @reset="(value) => emit('reset', value)"
    lang="en"
  >
    <template v-if="props.managers?.length">
      <tr v-for="manager in props.managers" :key="manager._id" data-test="manager-list-row">
        <td data-grow>
          <RouterLink :to="`${URL_MANAGER_EDIT}/${manager._id}`" data-test="manager-list-link">
            {{ manager.email }}
          </RouterLink>
        </td>
        <td data-no-wrap>{{ manager.firstName }} {{ manager.lastName }}</td>
        <td data-no-wrap>
          {{ formatDate(manager.dateCreated) }}
        </td>
        <td data-no-wrap>
          {{ formatDate(manager.dateUpdated) }}
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { IManager } from 'mhz-contracts';
import { UiTable } from 'mhz-ui';
import { formatDate, ISortOption } from 'mhz-helpers';

import { URL_MANAGER_EDIT } from '@/manager/constants';

interface IProps {
  managers?: IManager[];
  modelValue?: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ 'update:modelValue': [value: ISortOption]; reset: [value: string] }>();

const tableHeaders = [
  { value: 'email', title: 'Email' },
  { value: 'lastName', title: 'Name' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
];
</script>
