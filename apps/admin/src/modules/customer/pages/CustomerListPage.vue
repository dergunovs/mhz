<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <div :class="$style.page">
      <CustomerList
        :customers="customers"
        v-model="query.sort"
        @reset="(value) => resetQuery(value)"
        data-test="customer-list-page-list"
      />

      <UiPagination
        v-show="customers?.length"
        :page="query.page"
        :total="total"
        @update="(value) => setQueryPage(setPaginationPage(value, query.page))"
        lang="en"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import { UiPagination } from 'mhz-ui';
import { usePagination, usePage } from 'mhz-helpers';

import PageTitle from '@/layout/components/PageTitle.vue';
import CustomerList from '@/customer/components/CustomerList.vue';

import { getCustomers } from '@/customer/services';
import { URL_CUSTOMER } from '@/customer/constants';
import { URL_MAIN } from '@/common/constants';

const { query, resetQuery, setQueryPage } = usePage();

const { data } = getCustomers(query);

const { data: customers, total, setPaginationPage } = usePagination(data);

const title = 'Customers';

const links = [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_CUSTOMER, title },
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
