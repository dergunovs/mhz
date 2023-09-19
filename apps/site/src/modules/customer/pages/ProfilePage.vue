<template>
  <div>
    <CustomerForm v-if="props.customer" :customer="props.customer" />
  </div>
</template>

<script setup lang="ts">
import { ICustomer } from 'mhz-contracts';

import CustomerForm from '@/customer/components/CustomerForm.vue';

interface IProps {
  customer: ICustomer;
}

const props = defineProps<IProps>();
</script>
