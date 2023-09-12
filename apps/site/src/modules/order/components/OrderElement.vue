<template>
  <div>
    <RouterLink :to="`${URL_CUSTOMER_ORDERS}/${props.order._id}`">Order №{{ props.order._id }}</RouterLink>
    <div>{{ formatDateTime(props.order.dateCreated) }}</div>
    <div>Status: {{ props.order.status }}, price: {{ props.order.price }} {{ CURRENCY }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from 'mhz-helpers';
import { IOrder } from 'mhz-types';

import { CURRENCY } from '@/common/constants';
import { URL_CUSTOMER_ORDERS } from '@/customer/constants';

interface IProps {
  order: IOrder;
}

const props = defineProps<IProps>();
</script>
