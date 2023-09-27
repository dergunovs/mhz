<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <div v-if="cart?.length" :class="$style.cart">
      <CartItemList v-if="cart" :cart="cart" />
      <CartSummary v-if="cart" :cart="cart" />
    </div>

    <div v-else>Cart is empty.</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';
import CartItemList from '@/cart/components/CartItemList.vue';
import CartSummary from '@/cart/components/CartSummary.vue';

import { getCustomerCart } from '@/customer/services';

const { data: cart } = getCustomerCart(ref(true));

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
