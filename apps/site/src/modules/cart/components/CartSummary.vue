<template>
  <div :class="$style.price">{{ price }} {{ CURRENCY }}</div>
</template>

<script setup lang="ts">
import { ICartItem } from 'mhz-types';
import { computed } from 'vue';

import { CURRENCY } from '@/common/constants';

interface IProps {
  cart: ICartItem[];
}

const props = defineProps<IProps>();

const price = computed(() => props.cart.reduce((acc, item) => acc + item.count * item.product.price, 0));
</script>

<style module lang="scss">
.price {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  text-wrap: nowrap;
}
</style>
