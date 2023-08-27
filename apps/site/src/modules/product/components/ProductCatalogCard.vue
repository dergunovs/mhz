<template>
  <div :class="$style.card">
    <RouterLink :to="productLink" :class="$style.imageBlock">
      <img
        :src="`${PATH_UPLOAD}/${props.product.imageUrls[0]}`"
        :class="$style.image"
        height="200"
        :alt="props.product.title"
        :title="props.product.title"
        loading="lazy"
      />
    </RouterLink>

    <div :class="$style.info">
      <RouterLink :to="productLink" :class="$style.title">
        {{ props.product.title }}
      </RouterLink>

      <div :class="$style.priceBlock">
        <div :class="$style.price">{{ props.product.price }} {{ CURRENCY }}</div>

        <ProductActionButtons :product="props.product" />
      </div>
    </div>

    <UiButton>Add to cart</UiButton>
  </div>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';
import { IProduct } from 'mhz-types';

import ProductActionButtons from './ProductActionButtons.vue';

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
  gap: 16px;
  width: 100%;
  min-width: 300px;
}

.imageBlock {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;

  &:hover + .info .title {
    color: var(--color-primary-dark);
  }

  .image {
    width: auto;
    max-height: 200px;
  }
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
  color: var(--color-black);
  text-decoration: none;
}

.priceBlock {
  display: flex;
  justify-content: space-between;
}

.price {
  font-size: 1.75rem;
  font-weight: 700;
}
</style>
