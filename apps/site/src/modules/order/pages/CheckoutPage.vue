<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <div>Customer name, phone</div>
    <div>Shiping: map, description, date = today + 1</div>
    <div>Payment: type = card</div>

    <div>Products with summary price</div>

    <div>Delete all products from cart</div>

    <UiButton @click="router.push(URL_PAYMENT)">Create order</UiButton>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

import { UiButton } from 'mhz-ui';

import PageTitle from '@/layout/components/PageTitle.vue';

import { URL_PAYMENT } from '@/order/contants';

const router = useRouter();

const title = 'Checkout';

useHead({
  title,
});
</script>
