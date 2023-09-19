<template>
  <div :class="$style.list">
    <OrderElement v-for="order in props.orders" :key="order._id" :order="order" />
  </div>
</template>

<script setup lang="ts">
import { IOrder } from 'mhz-contracts';

import OrderElement from '@/order/components/OrderElement.vue';

interface IProps {
  orders: IOrder[];
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
