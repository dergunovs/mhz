<template>
  <div :class="$style.container">
    <UiButton @click="$router.push(URL_CART)" layout="plain" :icon="IconCart">Cart</UiButton>
    <div :class="$style.count">{{ count }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiButton } from 'mhz-ui';

import IconCart from '@/layout/icons/cart.svg?component';

import { URL_CART } from '@/cart/constants';
import { getCustomerCart } from '@/customer/services';
import { useCart } from '@/cart/composables';

const { data: cart } = getCustomerCart(ref(true));

const { count } = useCart(cart);
</script>

<style module lang="scss">
.container {
  position: relative;
  display: flex;
}

.count {
  position: absolute;
  top: -12px;
  right: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--color-white);
  background-color: var(--color-accent);
  border-radius: 50%;
}
</style>
