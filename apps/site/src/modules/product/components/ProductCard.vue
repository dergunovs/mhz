<template>
  <div :class="$style.card">
    <RouterLink :to="productLink" :class="$style.image">
      <img :src="`${PATH_UPLOAD}/${props.product.imageUrls[0]}`" width="200" />
    </RouterLink>

    <div :class="$style.info">
      <RouterLink :to="productLink" :class="$style.title">
        {{ props.product.title }}
      </RouterLink>

      <div :class="$style.priceBlock">
        <div :class="$style.price">{{ props.product.price }} {{ CURRENCY }}</div>

        <div :class="$style.buttons">
          <button :class="$style.button" type="button">
            <IconComparison />
          </button>

          <button :class="$style.button" type="button">
            <IconFavourites />
          </button>
        </div>
      </div>
    </div>

    <UiButton>Add to cart</UiButton>
  </div>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';
import { IProduct } from 'mhz-types';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_PRODUCT } from '@/product/constants';

import IconComparison from '@/product/icons/comparison.svg';
import IconFavourites from '@/product/icons/favourites.svg';

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
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &:hover + .info .title {
    color: var(--color-primary-dark);
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

.buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.button {
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: var(--color-gray-light);
  border: none;
  border-radius: 8px;

  &:hover {
    background-color: var(--color-gray);
  }
}
</style>
