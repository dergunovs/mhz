<template>
  <div>
    <PageTitle>{{ title }}</PageTitle>

    <div :class="$style.container">
      <div :class="$style.checkout">
        <div>
          <div><b>Customer</b></div>
          <div>{{ customer?.firstName }} {{ customer?.lastName }}, {{ customer?.phone }}, {{ customer?.email }}</div>
        </div>

        <div>
          <b>Payment</b><br />
          <div>Payment by bank card at the next stage.</div>
          <div>Working hours: 9:00am - 8:00pm.</div>
        </div>

        <div>
          <div><b>Shiping</b></div>
          <div>
            Pickup of goods from our store at
            <a href="https://yandex.ru/maps/-/CDQpbGkw" target="_blank" rel="noopener noreferrer">city of Vladimir.</a>
          </div>

          <img :src="ImageMap" width="600" height="341" alt="Map" loading="lazy" />
        </div>
      </div>

      <div :class="$style.summary">
        <CartItemList v-if="cart" :cart="cart" isCheckout />

        <div :class="$style.price">{{ price }} {{ CURRENCY }}</div>

        <UiButton @click="router.push(URL_PAYMENT)">Continue to payment</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

import { UiButton } from 'mhz-ui';

import PageTitle from '@/layout/components/PageTitle.vue';
import ImageMap from '@/common/images/map.jpg';
import CartItemList from '@/cart/components/CartItemList.vue';

import { getCurrentCustomer, getCustomerCart } from '@/customer/services';
import { URL_PAYMENT } from '@/order/contants';
import { CURRENCY } from '@/common/constants';

const router = useRouter();

const { data: customer } = getCurrentCustomer();

const { data: cart } = getCustomerCart();

const price = computed(() => cart.value?.reduce((acc, item) => acc + item.count * item.product.price, 0));

const title = 'Checkout';

useHead({
  title,
});
</script>

<style module lang="scss">
.container {
  display: flex;
  gap: 64px;
}

.checkout {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 16px;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  text-wrap: nowrap;
  border-top: 1px solid var(--color-gray);
}
</style>
