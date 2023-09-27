<template>
  <div :class="$style.summary">
    <div :class="$style.title">Summary</div>

    <div :class="$style.priceBlock">
      <span>{{ count }} item<template v-if="count && count > 1">s</template></span>
      <span :class="$style.price">{{ price }} {{ CURRENCY }}</span>
    </div>

    <UiButton @click="router.push(URL_CHECKOUT)">Go to checkout</UiButton>

    <div>All products are in stock. Available shipment and payment methods can be selected when placing an order.</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { ICartItem } from 'mhz-contracts';
import { UiButton } from 'mhz-ui';

import { useCart } from '@/cart/composables';
import { CURRENCY } from '@/common/constants';
import { URL_CHECKOUT } from '@/order/contants';

interface IProps {
  cart: ICartItem[];
}

const props = defineProps<IProps>();

const router = useRouter();

const cartComputed = computed(() => props.cart);

const { count, price } = useCart(cartComputed);
</script>

<style module lang="scss">
.summary {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  max-width: 400px;
}

.title {
  font-size: 1.5rem;
  line-height: 1;
}

.priceBlock {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  line-height: 1;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  text-wrap: nowrap;
}
</style>
