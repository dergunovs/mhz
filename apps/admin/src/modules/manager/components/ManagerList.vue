<template>
  <UiTable
    :headers="tableHeaders"
    :isLoading="!props.managers?.length"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
  >
    <template v-if="props.managers?.length">
      <tr v-for="manager in props.managers" :key="manager._id">
        <td data-grow>
          <RouterLink :to="`${URL_MANAGER_EDIT}/${manager._id}`">
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
        <td>
          <UiButton @click="mutate(manager._id)" layout="plain">Delete</UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';

import { IManager } from 'mhz-types';
import { UiTable, UiButton, toast } from 'mhz-ui';
import { formatDate } from 'mhz-helpers';

import { deleteManager } from '@/manager/services';
import { API_MANAGER, URL_MANAGER_EDIT } from '@/manager/constants';
import { ISortOption } from '@/common/interface';

interface IProps {
  managers?: IManager[];
  modelValue: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);

const tableHeaders = [
  { value: 'email', title: 'Email' },
  { value: 'lastName', title: 'Name' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
  { title: '' },
];

const queryClient = useQueryClient();

const { mutate } = deleteManager({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANAGER, 1], exact: true });
    toast.success('Manager deleted');
  },
});
</script>
