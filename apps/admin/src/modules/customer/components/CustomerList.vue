<template>
  <UiTable
    :headers="tableHeaders"
    :isLoading="!props.customers?.length"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @reset="(value) => emit('reset', value)"
  >
    <template v-if="props.customers?.length">
      <tr v-for="customer in props.customers" :key="customer._id" data-test="customer-list-row">
        <td data-grow>
          <RouterLink :to="`${URL_CUSTOMER}/${customer._id}`" data-test="customer-list-link">
            {{ customer.email }}
          </RouterLink>
        </td>
        <td data-no-wrap>{{ customer.firstName }} {{ customer.lastName }}</td>
        <td data-no-wrap>
          {{ formatDate(customer.dateCreated) }}
        </td>
        <td data-no-wrap>
          {{ formatDate(customer.dateUpdated) }}
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { ICustomer } from 'mhz-contracts';
import { UiTable } from 'mhz-ui';
import { formatDate, ISortOption } from 'mhz-helpers';

import { URL_CUSTOMER } from '@/customer/constants';

interface IProps {
  customers?: ICustomer[];
  modelValue?: ISortOption;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ 'update:modelValue': [value: ISortOption]; reset: [value: string] }>();

const tableHeaders = [
  { value: 'email', title: 'Email' },
  { value: 'lastName', title: 'Name' },
  { value: 'dateCreated', title: 'Created' },
  { value: 'dateUpdated', title: 'Updated' },
];
</script>
