<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div :class="$style.page">
      <OrderList
        :orders="orders"
        v-model="query.sort"
        @reset="(value) => resetQuery(value)"
        data-test="order-list-page-list"
      />

      <UiPagination
        v-show="orders?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPaginationPage(value, query.page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import OrderList from '@/order/components/OrderList.vue';

import { getOrders } from '@/order/services';
import { URL_ORDER } from '@/order/constants';
import { URL_MAIN } from '@/common/constants';

const { query, resetQuery, setQueryPage } = usePage();

const { data } = getOrders(query);

const { data: orders, total, setPaginationPage } = usePagination(data);

const title = 'Orders';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_ORDER, title },
];

useHead({
  title,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
