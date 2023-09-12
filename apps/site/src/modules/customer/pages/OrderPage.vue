<template>
  <div>
    <OrderForm v-if="order" :order="order" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import OrderForm from '@/order/components/OrderForm.vue';

import { getOrder } from '@/order/services';

const route = useRoute();

const orderId = computed(() => route.params.order);

const { data: order } = getOrder(orderId);
</script>
