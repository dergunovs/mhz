<template>
  <UiTable
    :headers="tableHeaders"
    :isLoading="!props.categories?.length"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @reset="(value) => emit('reset', value)"
  >
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
import { ISortOption, formatDate } from 'mhz-helpers';

import { URL_CATEGORY_EDIT } from '@/category/constants';

interface IProps {
  categories?: ICategory[];
  modelValue: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue', 'reset']);

const tableHeaders = [
  { value: 'title', title: 'Category' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
];
</script>
