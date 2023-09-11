<template>
  <UiTable
    :headers="tableHeaders"
    :isLoading="!props.orders?.length"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @reset="(value) => emit('reset', value)"
  >
    <template v-if="props.orders?.length">
      <tr v-for="order in props.orders" :key="order._id">
        <td data-grow>
          <RouterLink :to="`${URL_ORDER}/${order._id}`">
            {{ order._id }}
          </RouterLink>
        </td>
        <td data-no-wrap>{{ order.customer.firstName }} {{ order.customer.lastName }}</td>
        <td data-no-wrap>{{ order.status }}</td>
        <td data-no-wrap>
          {{ formatDate(order.dateCreated) }}
        </td>
        <td data-no-wrap>
          {{ formatDate(order.dateUpdated) }}
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { IOrder } from 'mhz-types';
import { UiTable } from 'mhz-ui';
import { formatDate, ISortOption } from 'mhz-helpers';

import { URL_ORDER } from '@/order/constants';

interface IProps {
  orders?: IOrder[];
  modelValue: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue', 'reset']);

const tableHeaders = [
  { value: '_id', title: 'ID' },
  { value: 'customer', title: 'Customer' },
  { value: 'status', title: 'Status' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
];
</script>
