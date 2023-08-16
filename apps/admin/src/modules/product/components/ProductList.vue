<template>
  <UiTable
    :headers="tableHeaders"
    :isLoading="!props.products?.length"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @reset="(value) => emit('reset', value)"
  >
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
import { formatDate, ISortOption } from 'mhz-helpers';

import { deleteProduct } from '@/product/services';
import { API_PRODUCT, URL_PRODUCT_EDIT } from '@/product/constants';

interface IProps {
  products?: IProduct[];
  modelValue: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue', 'reset']);

const tableHeaders = [
  { value: 'title', title: 'Product' },
  { value: 'category', title: 'Category' },
  { value: 'manufacturer', title: 'Manufacturer' },
  { value: 'price', title: 'Price' },
  { value: 'isInStock', title: 'In stock' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
  { title: '' },
];

const queryClient = useQueryClient();

const { mutate } = deleteProduct({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_PRODUCT] });
    toast.success('Product deleted');
  },
});
</script>
