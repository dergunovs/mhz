<template>
  <div :class="$style.list" :data-checkout="props.isCheckout">
    <CartItem v-for="item in props.cart" :key="item._id" :item="item" :isCheckout="props.isCheckout" />
  </div>
</template>

<script setup lang="ts">
import { ICartItem } from 'mhz-contracts';

import CartItem from '@/cart/components/CartItem.vue';

interface IProps {
  cart: ICartItem[];
  isCheckout?: boolean;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &[data-checkout='true'] {
    gap: 8px;
  }
}
</style>
