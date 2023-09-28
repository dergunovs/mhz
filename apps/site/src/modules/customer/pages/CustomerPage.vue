<template>
  <div :class="$style.container">
    <PageTitle v-if="customer && $route.name !== 'ConfigurationCreate'">{{ title }}</PageTitle>

    <div :class="$style.page">
      <CustomerNav v-if="$route.name !== 'ConfigurationCreate'" />

      <RouterView v-if="customer" :customer="customer" :class="$style.routerView" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHead } from '@unhead/vue';

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
.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page {
  display: flex;
  flex-grow: 1;
  gap: 32px;
}

.routerView {
  flex-grow: 1;
}

@media (max-width: $notebook) {
  .page {
    gap: 16px;
  }
}
</style>
