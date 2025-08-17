<template>
  <div :class="$style.slide" :data-visible="props.isVisible">
    <div :class="$style.inner">
      <div :class="$style.text">{{ props.banner.text }}</div>

      <div :class="$style.priceBlock">
        <div :class="$style.productBlock">
          <div :class="$style.product">{{ props.banner.product.title }}</div>

          <div>
            <UiButton @click="$router.push(`${URL_PRODUCT}/${props.banner.product._id}`)" layout="secondary">
              Go to product
            </UiButton>
          </div>
        </div>

        <div :class="$style.price">{{ props.banner.product.price }} {{ CURRENCY }}</div>
      </div>
    </div>

    <img
      :src="`${PATH_UPLOAD}/${props.banner.imageUrl}`"
      :class="$style.image"
      width="280"
      height="280"
      crossorigin="anonymous"
      :alt="props.banner.product.title"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { UiButton } from 'mhz-ui';
import { IBanner } from 'mhz-contracts';

import { URL_PRODUCT } from '@/product/constants';
import { CURRENCY, PATH_UPLOAD } from '@/common/constants';

interface IProps {
  banner: IBanner;
  isVisible: boolean;
}

const props = defineProps<IProps>();

const canvas = computed(() => props.banner.color);
</script>

<style module lang="scss">
.slide {
  display: none;
  gap: 32px;
  justify-content: space-between;
  padding: 48px;
  background-color: v-bind(canvas);
  border-radius: 8px;

  &[data-visible='true'] {
    display: flex;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: calc(100% - 240px - 136px);
}

.text {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.8px;
}

.priceBlock {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  justify-content: space-between;
}

.productBlock {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.product {
  font-size: 1.5rem;
  font-weight: 700;
}

.price {
  width: 214px;
  padding: 32px 40px;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
  background: linear-gradient(300deg, var(--color-accent) 14%, var(--color-accent-light) 98%);
  border-radius: 62% 38% 65% 35% / 61% 34% 66% 39%;
}

.image {
  width: 280px;
  height: 280px;
}

@media (max-width: $tablet) {
  .inner {
    width: calc(100% - 240px - 32px);
  }

  .text {
    font-size: 1.5rem;
  }

  .price {
    padding: 32px;
    font-size: 1.5rem;
  }

  .image {
    width: 240px;
    height: 240px;
  }
}

@media (max-width: $mobile) {
  .slide {
    flex-direction: column;
    align-items: center;
    padding: 32px 16px 48px;
  }

  .inner {
    width: 100%;
  }

  .priceBlock {
    gap: 16px;
  }

  .price {
    flex-shrink: 0;
    width: 120px;
    padding: 24px;
    font-size: 1.25rem;
    white-space: nowrap;
  }
}
</style>
