<template>
  <div>
    <PageTitle v-if="customer">{{ title }}</PageTitle>

    <div :class="$style.page">
      <CustomerNav />

      <div>
        <RouterView v-if="customer" :customer="customer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';
import CustomerNav from '@/customer/components/CustomerNav.vue';

import { getCurrentCustomer } from '@/customer/services';

const { data: customer } = getCurrentCustomer();

const title = computed(() => `${customer.value?.firstName} ${customer.value?.lastName}`);

useHead({
  title: () => title.value,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  gap: 32px;
}
</style>
