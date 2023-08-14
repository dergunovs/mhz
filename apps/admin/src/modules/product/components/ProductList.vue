<template>
  <UiTable :headers="tableHeaders" :isLoading="!props.products?.length">
    <template v-if="props.products?.length">
      <tr v-for="product in props.products" :key="product._id">
        <td data-grow>
          <RouterLink :to="`${URL_PRODUCT_EDIT}/${product._id}`">
            {{ product.title }}
          </RouterLink>
        </td>
        <td data-no-wrap>
          {{ product.category.title }}
        </td>
        <td data-no-wrap>
          {{ product.manufacturer.title }}
        </td>
        <td data-no-wrap>
          {{ product.price }}
        </td>
        <td data-no-wrap>
          {{ product.isInStock ? 'Yes' : 'No' }}
        </td>
        <td data-no-wrap>
          {{ formatDate(product.dateCreated) }}
        </td>
        <td data-no-wrap>
          {{ formatDate(product.dateUpdated) }}
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
import { formatDate } from 'mhz-helpers';

import { deleteProduct } from '@/product/services';
import { API_PRODUCT, URL_PRODUCT_EDIT } from '@/product/constants';

interface IProps {
  products?: IProduct[];
}

const props = defineProps<IProps>();

const tableHeaders = ['Product', 'Category', 'Manufacturer', 'Price', 'In stock', 'Created', 'Updated', ''];

const queryClient = useQueryClient();

const { mutate } = deleteProduct({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT, 1], exact: true });
    toast.success('Product deleted');
  },
});
</script>
