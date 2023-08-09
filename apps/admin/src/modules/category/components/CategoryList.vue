<template>
  <UiTable :headers="tableHeaders">
    <template v-if="props.categories?.length">
      <tr v-for="category in props.categories" :key="category._id">
        <td data-grow>
          <RouterLink :to="`${URL_CATEGORY_EDIT}/${category._id}`">
            {{ category.title }}
          </RouterLink>
        </td>
        <td data-no-wrap>
          {{ formatDateTime(category.date_created) }}
        </td>
        <td data-no-wrap>
          {{ formatDateTime(category.date_updated) }}
        </td>
        <td>
          <UiButton @click="mutate(category._id)" layout="plain">Delete</UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';

import { ICategory } from 'mhz-types';
import { UiTable, UiButton, toast } from 'mhz-ui';
import { formatDateTime } from 'mhz-helpers';

import { deleteCategory } from '@/category/services';
import { API_CATEGORY, URL_CATEGORY_EDIT } from '@/category/constants';

interface IProps {
  categories?: ICategory[];
}

const props = defineProps<IProps>();

const tableHeaders = ['Category', 'Created', 'Updated', ''];

const queryClient = useQueryClient();

const { mutate } = deleteCategory({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CATEGORY], exact: true });
    toast.success('Category deleted');
  },
});
</script>
