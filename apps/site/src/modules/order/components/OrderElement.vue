<template>
  <div>
    <RouterLink :to="`${URL_CUSTOMER_ORDERS}/${props.order._id}`">№{{ props.order._id }}</RouterLink>

    <div>Date: {{ formatDateTime(props.order.dateCreated) }}</div>

    <div>
      Status: <span :class="$style.status" :data-status="props.order.status">{{ props.order.status }}</span>
    </div>

    <div>Price: {{ props.order.price }} {{ CURRENCY }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from 'mhz-helpers';
import { IOrder } from 'mhz-contracts';

import { CURRENCY } from '@/common/constants';
import { URL_CUSTOMER_ORDERS } from '@/customer/constants';

interface IProps {
  order: IOrder;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.status {
  font-weight: 700;

  &[data-status='completed'] {
    color: var(--color-success);
  }

  &[data-status='cancelled'] {
    color: var(--color-error);
  }
}
</style>
