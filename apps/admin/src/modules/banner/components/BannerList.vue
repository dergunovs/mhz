<template>
  <div>
    <UiTable
      :headers="tableHeaders"
      :isLoading="!props.banners?.length"
      :modelValue="props.modelValue"
      @update:modelValue="(value) => emit('update:modelValue', value)"
      @reset="(value) => emit('reset', value)"
      lang="en"
      data-test="banner-list-table"
    >
      <template v-if="props.banners?.length">
        <tr v-for="banner in props.banners" :key="banner._id" data-test="banner-list-row">
          <td data-grow>
            <RouterLink :to="`${URL_BANNER_EDIT}/${banner._id}`" data-test="banner-list-link">
              {{ banner.product.title }}
            </RouterLink>
          </td>
          <td data-no-wrap>{{ banner.isActive }}</td>
          <td data-no-wrap>
            {{ formatDate(banner.dateCreated) }}
          </td>
          <td data-no-wrap>
            {{ formatDate(banner.dateUpdated) }}
          </td>
        </tr>
      </template>
    </UiTable>
  </div>
</template>

<script setup lang="ts">
import { IBanner } from 'mhz-contracts';
import { UiTable } from 'mhz-ui';
import { formatDate, ISortOption } from 'mhz-helpers';

import { URL_BANNER_EDIT } from '@/banner/constants';

interface IProps {
  banners?: IBanner[];
  modelValue?: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ 'update:modelValue': [value: ISortOption]; reset: [value: string] }>();

const tableHeaders = [
  { value: 'product', title: 'Product' },
  { value: 'isActive', title: 'Is active' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
];
</script>
