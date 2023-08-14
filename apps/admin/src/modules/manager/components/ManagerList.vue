<template>
  <UiTable :headers="tableHeaders" :isLoading="!props.managers?.length">
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

interface IProps {
  managers?: IManager[];
}

const props = defineProps<IProps>();

const tableHeaders = ['Email', 'Name', 'Created', 'Updated', ''];

const queryClient = useQueryClient();

const { mutate } = deleteManager({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_MANAGER, 1], exact: true });
    toast.success('Manager deleted');
  },
});
</script>
