<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <OrderForm v-if="order" :order="order" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import OrderForm from '@/order/components/OrderForm.vue';

import { getOrder } from '@/order/services';
import { URL_ORDER } from '@/order/constants';
import { URL_MAIN } from '@/common/constants';

const route = useRoute();

const orderId = computed(() => route.params.order);

const { data: order } = getOrder(orderId);

const title = 'Order';

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_ORDER, title: 'Orders' },
  { url: route.path, title: order.value ? `${order.value._id}` : '' },
]);

useHead({
  title,
});
</script>
