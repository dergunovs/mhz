<template>
  <UiTable :headers="tableHeaders">
    <template v-if="props.categories?.length">
      <tr v-for="product in props.categories" :key="product._id">
        <td data-grow>
          <RouterLink :to="`${URL_PRODUCT_EDIT}/${product._id}`">
            {{ product.title }}
          </RouterLink>
        </td>
        <td data-no-wrap>
          {{ formatDateTime(product.date_created) }}
        </td>
        <td data-no-wrap>
          {{ formatDateTime(product.date_updated) }}
        </td>
        <td>
          <UiButton @click="mutate(product._id)" layout="plain">Delete</UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';

import { IProduct } from 'mhz-types';
import { UiTable, UiButton, toast } from 'mhz-ui';
import { formatDateTime } from 'mhz-helpers';

import { deleteProduct } from '@/product/services';
import { API_PRODUCT, URL_PRODUCT_EDIT } from '@/product/constants';

interface IProps {
  categories?: IProduct[];
}

const props = defineProps<IProps>();

const tableHeaders = ['Product', 'Created', 'Updated', ''];

const queryClient = useQueryClient();

const { mutate } = deleteProduct({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT], exact: true });
    toast.success('Product deleted');
  },
});
</script>
