<template>
  <div>
    <div :class="$style.top">
      <div :class="$style.image">
        <UiSlider
          v-if="props.product.imageUrls"
          :slides="props.product.imageUrls"
          :thumbs="props.product.thumbUrls"
          :path="`${PATH_UPLOAD}/`"
        />
      </div>

      <div :class="$style.fields">
        <div :class="$style.fieldsTop">
          <RouterLink :to="`${URL_MANUFACTURER}/${props.product.manufacturer?._id}`" :class="$style.logoLink">
            <img
              :src="`${PATH_UPLOAD}/${props.product.manufacturer?.logoUrl}`"
              height="64"
              :alt="props.product.manufacturer?.title"
              :title="props.product.manufacturer?.title"
              :class="$style.logo"
              crossorigin="anonymous"
            />
          </RouterLink>

          <div>
            Manufacturer:
            <RouterLink :to="`${URL_MANUFACTURER}/${props.product.manufacturer?._id}`">
              {{ props.product.manufacturer?.title }}
            </RouterLink>
            ({{ props.product.manufacturer?.country }})
          </div>

          <div>
            Category:
            <RouterLink :to="`${URL_CATEGORY}/${props.product.category._id}`">
              {{ props.product.category.title }}
            </RouterLink>
          </div>
        </div>

        <h3>Specifications</h3>

        <div v-for="field in product.fields" :key="field._id" :class="$style.field">
          <span :class="$style.fieldTitle">{{ field.title }}</span>
          <span>{{ field.fieldValue }} {{ field.fieldUnits }}</span>
        </div>

        <a href="#description">Read full description</a>
      </div>

      <div :class="$style.actions">
        <div :class="$style.stock">
          {{ props.product.isInStock ? 'In stock' : 'Not in stock' }}
          <ProductActionButtons v-if="isAuth" :product="props.product" />
        </div>

        <div :class="$style.price">{{ props.product.price }} {{ CURRENCY }}</div>

        <ProductAddToCartButton v-if="props.product._id" :id="props.product._id" />

        <div>Delivery in 7 days. No Import Fees Deposit.</div>
      </div>
    </div>

    <h2 id="description">Description</h2>
    <div v-html="product.description"></div>
  </div>
</template>

<script setup lang="ts">
import { UiSlider } from 'mhz-ui';
import { IProduct } from 'mhz-contracts';
import { isAuth } from 'mhz-helpers';

import ProductActionButtons from '@/product/components/ProductActionButtons.vue';
import ProductAddToCartButton from '@/product/components/ProductAddToCartButton.vue';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

interface IProps {
  product: IProduct;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.top {
  display: flex;
  justify-content: space-between;
}

.image {
  width: 35%;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fieldsTop {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.logoLink {
  height: 48px;
}

.logo {
  width: fit-content;
  height: 48px;
}

.field {
  display: flex;
  gap: 8px;
}

.fieldTitle {
  display: inline-block;
  width: 300px;
  color: var(--color-gray-dark-extra);
  border-bottom: 1px solid var(--color-gray-light);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 25%;
}

.price {
  font-size: 3rem;
  font-weight: 700;
}

.stock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
}

@media (max-width: $notebook) {
  .fieldTitle {
    width: 180px;
  }
}

@media (max-width: $mobile) {
  .top {
    flex-direction: column;
    gap: 24px;
  }

  .image {
    width: 100%;
  }

  .actions {
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>
