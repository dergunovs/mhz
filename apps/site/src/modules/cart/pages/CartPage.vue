<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <CartItemList v-if="cart" :cart="cart" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';
import CartItemList from '@/cart/components/CartItemList.vue';

import { getCustomerCart } from '@/customer/services';

const { data: cart } = getCustomerCart();

const title = 'Cart';

useHead({
  title,
});
</script>
