<template>
  <div :class="$style.cart">
    <div v-if="!props.isCheckout">
      <img :src="`${PATH_UPLOAD}/${props.item.product.thumbUrls[0]}`" width="128" crossorigin="anonymous" />
    </div>

    <div :class="$style.text" :data-checkout="props.isCheckout">
      <RouterLink :to="`${URL_PRODUCT}/${props.item.product._id}`">
        {{ props.item.product.title }}
      </RouterLink>

      <div v-if="!props.isCheckout">
        <span>Category: </span>
        <RouterLink :to="`${URL_CATEGORY}/${props.item.product.category._id}`">
          {{ props.item.product.category.title }}
        </RouterLink>
      </div>

      <ProductActionButtons v-if="!props.isCheckout" :product="props.item.product" />
    </div>

    <div :class="$style.price">
      <div v-if="!props.isCheckout" :class="$style.priceComputed">{{ priceComputed }} {{ CURRENCY }}</div>
      <div>{{ `${props.item.count} x ${props.item.product.price}` }} {{ CURRENCY }}</div>
    </div>

    <div v-if="!props.isCheckout" :class="$style.actions">
      <CartItemCount
        :id="props.item._id"
        :count="props.item.count"
        @update="(count) => updateCount({ count, _id: props.item.product._id })"
      />

      <UiButton @click="mutate(props.item._id)" layout="plain">Remove from cart</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { UiButton, toast } from 'mhz-ui';
import { ICartItem } from 'mhz-types';
import { useQueryClient } from 'mhz-helpers';

import CartItemCount from '@/cart/components/CartItemCount.vue';
import ProductActionButtons from '@/product/components/ProductActionButtons.vue';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_PRODUCT } from '@/product/constants';
import { removeFromCart, updateCountCart } from '@/customer/services';
import { API_CUSTOMER_CART } from '@/customer/constants';

interface IProps {
  item: ICartItem;
  isCheckout?: boolean;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const priceComputed = computed(() => props.item.count * props.item.product.price);

const { mutate } = removeFromCart({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_CART] });
    toast.success('Removed from cart');
  },
});

const { mutate: updateCount } = updateCountCart({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_CART] });
  },
});
</script>

<style module lang="scss">
.cart {
  display: flex;
  gap: 64px;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 400px;

  &[data-checkout='true'] {
    width: 240px;
  }
}

.price {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.priceComputed {
  width: 160px;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  text-wrap: nowrap;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
