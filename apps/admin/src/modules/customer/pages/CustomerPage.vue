<template>
  <div>
    <PageTitle :links="links">{{ title }}</PageTitle>

    <CustomerInfo v-if="customer" :customer="customer" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import CustomerInfo from '@/customer/components/CustomerInfo.vue';

import { getCustomer } from '@/customer/services';
import { URL_CUSTOMER } from '@/customer/constants';
import { URL_MAIN } from '@/common/constants';

const route = useRoute();

const customerId = computed(() => route.params.customer);

const { data: customer } = getCustomer(customerId);

const title = 'Customer';

const links = computed(() => [
  { url: URL_MAIN, title: 'Main' },
  { url: URL_CUSTOMER, title: 'Customers' },
  { url: route.path, title: customer.value ? `${customer.value.firstName} ${customer.value.lastName}` : '' },
]);

useHead({
  title,
});
</script>
