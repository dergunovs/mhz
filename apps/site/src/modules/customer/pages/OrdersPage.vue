<template>
  <div :class="$style.page">
    <OrderList v-if="orders" :orders="orders" />

    <UiPagination
      v-show="orders?.length"
      :page="query.page"
      :total="total"
      @update="(value: number) => setQueryPage(setPage(value, query.page))"
    />
  </div>
</template>

<script setup lang="ts">
import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import OrderList from '@/order/components/OrderList.vue';

import { getOrders } from '@/order/services';

const { query, setQueryPage } = usePage();

const { data } = getOrders(query);

const { data: orders, total, setPage } = usePagination(data);
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
