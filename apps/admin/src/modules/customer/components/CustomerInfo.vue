<template>
  <div :class="$style.customer">
    <div>
      <b>Customer: </b>
      <span data-test="customer-info-name">{{ props.customer.firstName }} {{ props.customer.lastName }}</span>
      <a :href="`mailto:${props.customer.email}`" data-test="customer-info-email">{{ props.customer.email }} </a>
    </div>

    <div>
      <b>Created: </b>
      <span data-test="customer-info-created">{{ formatDateTime(props.customer.dateCreated) }}</span>
    </div>

    <div>
      <b>Login date: </b>
      <span data-test="customer-info-login">{{ formatDateTime(props.customer.dateLoggedIn) }}</span>
    </div>

    <div v-if="props.customer.cart?.length" data-test="customer-info-cart">
      <div><b>Cart:</b></div>
      <div v-for="item in props.customer.cart" :key="item._id" data-test="customer-info-cart-item">
        <span data-test="customer-info-cart-item-count">{{ item.count }}</span> x
        <RouterLink :to="`${URL_PRODUCT_EDIT}/${item.product._id}`" data-test="customer-info-cart-item-title">
          {{ item.product.title }}
        </RouterLink>
      </div>
    </div>

    <div v-if="props.customer.favouriteProducts?.length" data-test="customer-info-favourites">
      <div><b>Favourites:</b></div>
      <div v-for="item in props.customer.favouriteProducts" :key="item._id" data-test="customer-info-favourites-item">
        <RouterLink :to="`${URL_PRODUCT_EDIT}/${item._id}`" data-test="customer-info-favourites-title">
          {{ item.title }}
        </RouterLink>
      </div>
    </div>

    <div v-if="props.customer.watchedProducts?.length" data-test="customer-info-watched-products">
      <div><b>Watched products:</b></div>
      <div
        v-for="item in props.customer.watchedProducts"
        :key="item._id"
        data-test="customer-info-watched-products-item"
      >
        <RouterLink :to="`${URL_PRODUCT_EDIT}/${item.product._id}`" data-test="customer-info-watched-products-title">
          {{ item.product.title }}
        </RouterLink>
        - <span data-test="customer-info-watched-products-date">{{ formatDateTime(item.dateCreated) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from 'mhz-helpers';
import { ICustomer } from 'mhz-contracts';

import { URL_PRODUCT_EDIT } from '@/product/constants';

interface IProps {
  customer: ICustomer;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.customer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
