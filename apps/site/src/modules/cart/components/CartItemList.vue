<template>
  <div :class="$style.list">
    <CartItem v-for="item in props.cart" :key="item._id" :item="item" />
  </div>
</template>

<script setup lang="ts">
import { ICartItem } from 'mhz-types';

import CartItem from '@/cart/components/CartItem.vue';

interface IProps {
  cart: ICartItem[];
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
