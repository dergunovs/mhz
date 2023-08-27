<template>
  <div>
    <PageTitle>Customer info</PageTitle>

    <div>{{ customer }}</div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/layout/components/PageTitle.vue';

import { getCurrentCustomer } from '@/customer/services';

const { data: customer } = getCurrentCustomer();
</script>
