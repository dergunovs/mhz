<template>
  <div :class="$style.cart">
    <div>
      <img :src="`${PATH_UPLOAD}/${props.item.product.imageUrls[0]}`" width="128" />
    </div>

    <div :class="$style.text">
      <RouterLink :to="`${URL_CATEGORY}/${props.item.product.category._id}${URL_PRODUCT}/${props.item.product._id}`">
        {{ props.item.product.title }}
      </RouterLink>

      <div>
        <span>Category: </span>
        <RouterLink :to="`${URL_CATEGORY}/${props.item.product.category._id}`">
          {{ props.item.product.category.title }}
        </RouterLink>
      </div>

      <ProductActionButtons :product="props.item.product" />
    </div>

    <div :class="$style.price">{{ props.item.product.price }} {{ CURRENCY }}</div>

    <div>
      <div>Count: {{ props.item.count }}</div>

      <UiButton layout="plain">Delete</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';
import { ICartItem } from 'mhz-types';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_PRODUCT } from '@/product/constants';
import ProductActionButtons from '@/product/components/ProductActionButtons.vue';

interface IProps {
  item: ICartItem;
}

const props = defineProps<IProps>();
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
}

.price {
  width: 160px;
  font-size: 2rem;
  font-weight: 700;
}
</style>
