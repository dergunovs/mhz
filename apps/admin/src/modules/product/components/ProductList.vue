<template>
  <UiTable
    :headers="tableHeaders"
    :isLoading="!props.products?.length"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @reset="(value) => emit('reset', value)"
    lang="en"
  >
    <template v-if="props.products?.length">
      <tr v-for="product in props.products" :key="product._id" data-test="product-list-row">
        <td data-grow>
          <RouterLink :to="`${URL_PRODUCT_EDIT}/${product._id}`" data-test="product-list-link">
            {{ product.title }}
          </RouterLink>
        </td>
        <td>
          {{ product.category.title }}
        </td>
        <td data-no-wrap>
          {{ product.manufacturer?.title }}
        </td>
        <td data-no-wrap>{{ product.price }} {{ CURRENCY }}</td>
        <td>
          {{ product.isInStock ? 'Yes' : 'No' }}
        </td>
        <td>
          {{ product.views }}
        </td>
        <td data-no-wrap>
          {{ formatDate(product.dateCreated) }}
        </td>
        <td data-no-wrap>
          {{ formatDate(product.dateUpdated) }}
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { IProduct } from 'mhz-contracts';
import { UiTable } from 'mhz-ui';
import { formatDate, ISortOption } from 'mhz-helpers';

import { URL_PRODUCT_EDIT } from '@/product/constants';
import { CURRENCY } from '@/common/constants';

interface IProps {
  products?: IProduct[];
  modelValue?: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ 'update:modelValue': [value: ISortOption]; reset: [value: string] }>();

const tableHeaders = [
  { value: 'title', title: 'Product' },
  { value: 'category', title: 'Category' },
  { value: 'manufacturer', title: 'Manufacturer' },
  { value: 'price', title: 'Price' },
  { value: 'isInStock', title: 'In stock' },
  { value: 'views', title: 'Views' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
];
</script>
