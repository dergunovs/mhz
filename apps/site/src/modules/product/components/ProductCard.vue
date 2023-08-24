<template>
  <div :class="$style.card">
    <RouterLink :to="productLink" :class="$style.image">
      <img :src="`${PATH_UPLOAD}/${props.product.imageUrls[0]}`" width="200" />
    </RouterLink>

    <div :class="$style.info">
      <RouterLink :to="productLink" :class="$style.title">{{ props.product.title }}</RouterLink>
      <div :class="$style.price">{{ props.product.price }} {{ CURRENCY }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from 'mhz-types';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_PRODUCT } from '@/product/constants';

interface IProps {
  product: IProduct;
}

const props = defineProps<IProps>();

const productLink = `${URL_CATEGORY}/${props.product.category._id}${URL_PRODUCT}/${props.product._id}`;
</script>

<style module lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
  justify-content: space-between;
}

.title {
  font-size: 1.125rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
