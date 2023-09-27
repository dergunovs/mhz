<template>
  <div :class="$style.card">
    <component
      :is="props.isConfiguration ? 'button' : RouterLink"
      :to="`${URL_PRODUCT}/${props.product._id}`"
      @click="props.isConfiguration && emit('choice', props.product)"
      :class="$style.imageBlock"
    >
      <img
        :src="`${PATH_UPLOAD}/${props.product.thumbUrls[0]}`"
        :class="$style.image"
        height="200"
        :alt="props.product.title"
        :title="props.product.title"
        loading="lazy"
        crossorigin="anonymous"
      />
    </component>

    <div :class="$style.info">
      <component
        :is="props.isConfiguration ? 'div' : RouterLink"
        :to="`${URL_PRODUCT}/${props.product._id}`"
        :class="$style.title"
      >
        {{ props.product.title }}
      </component>

      <div :class="$style.priceBlock">
        <div :class="$style.price">{{ props.product.price }} {{ CURRENCY }}</div>

        <ProductActionButtons :product="props.product" />
      </div>
    </div>

    <ProductAddToCartButton v-if="props.product._id && !props.isConfiguration" :id="props.product._id" />

    <UiButton v-if="props.isConfiguration" @click="emit('choice', props.product)" isConfiguration>Choose</UiButton>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { IProduct } from 'mhz-contracts';
import { UiButton } from 'mhz-ui';

import ProductActionButtons from './ProductActionButtons.vue';
import ProductAddToCartButton from '@/product/components/ProductAddToCartButton.vue';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_PRODUCT } from '@/product/constants';

interface IProps {
  product: IProduct;
  isConfiguration?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['choice']);
</script>

<style module lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 240px;
}

.imageBlock {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  cursor: pointer;
  background: none;
  border: none;

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
