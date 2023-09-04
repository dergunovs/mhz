<template>
  <UiTable :headers="tableHeaders" :isLoading="!props.categories?.length">
    <template v-if="props.categories?.length">
      <tr v-for="category in props.categories" :key="category._id">
        <td data-grow>
          <RouterLink :to="`${URL_CATEGORY_EDIT}/${category._id}`">
            {{ category.title }}
          </RouterLink>
        </td>
        <td data-no-wrap>
          {{ formatDate(category.dateCreated) }}
        </td>
        <td data-no-wrap>
          {{ formatDate(category.dateUpdated) }}
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { ICategory } from 'mhz-types';
import { UiTable } from 'mhz-ui';
import { formatDate } from 'mhz-helpers';

import { URL_CATEGORY_EDIT } from '@/category/constants';

interface IProps {
  categories?: ICategory[];
}

const props = defineProps<IProps>();

const tableHeaders = [{ title: 'Category' }, { title: 'Created' }, { title: 'Updated' }];
</script>
