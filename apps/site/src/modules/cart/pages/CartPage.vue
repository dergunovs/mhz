<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <div :class="$style.cart">
      <CartItemList v-if="cart" :cart="cart" />
      <CartSummary v-if="cart" :cart="cart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

import PageTitle from '@/layout/components/PageTitle.vue';
import CartItemList from '@/cart/components/CartItemList.vue';
import CartSummary from '@/cart/components/CartSummary.vue';

import { getCustomerCart } from '@/customer/services';

const { data: cart } = getCustomerCart();

const title = 'Cart';

useHead({
  title,
});
</script>

<style module lang="scss">
.cart {
  display: flex;
  gap: 64px;
  justify-content: space-between;
}
</style>
