<template>
  <div :class="$style.customer">
    <div>
      <b>Customer: </b>{{ props.customer.firstName }} {{ props.customer.lastName }}
      <a :href="`mailto:${props.customer.email}`">{{ props.customer.email }} </a>
    </div>

    <div><b>Created: </b>{{ formatDateTime(props.customer.dateCreated) }}</div>

    <div><b>Login date: </b>{{ formatDateTime(props.customer.dateLoggedIn) }}</div>

    <div v-if="props.customer.cart?.length">
      <div><b>Cart:</b></div>
      <div v-for="item in props.customer.cart" :key="item._id">
        {{ item.count }} x
        <RouterLink :to="`${URL_PRODUCT_EDIT}/${item.product._id}`">{{ item.product.title }}</RouterLink>
      </div>
    </div>

    <div v-if="props.customer.favouriteProducts?.length">
      <div><b>Favourites:</b></div>
      <div v-for="item in props.customer.favouriteProducts" :key="item._id">
        <RouterLink :to="`${URL_PRODUCT_EDIT}/${item._id}`">{{ item.title }}</RouterLink>
      </div>
    </div>

    <div v-if="props.customer.watchedProducts?.length">
      <div><b>Watched products:</b></div>
      <div v-for="item in props.customer.watchedProducts" :key="item._id">
        <RouterLink :to="`${URL_PRODUCT_EDIT}/${item.product._id}`">{{ item.product.title }}</RouterLink>
        {{ formatDateTime(item.dateCreated) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from 'mhz-helpers';
import { ICustomer } from 'mhz-types';

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
