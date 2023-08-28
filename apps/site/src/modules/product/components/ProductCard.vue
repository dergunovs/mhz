<template>
  <div>
    <div :class="$style.top">
      <div :class="$style.image">
        <img :src="`${PATH_UPLOAD}/${product.imageUrls[0]}`" :alt="product.title" loading="lazy" />
      </div>

      <div :class="$style.fields">
        <div :class="$style.fieldsTop">
          <RouterLink :to="`${URL_MANUFACTURER}/${props.product.manufacturer._id}`">
            <img
              :src="`${PATH_UPLOAD}/${props.product.manufacturer.logoUrl}`"
              width="160"
              :alt="props.product.manufacturer.title"
              :title="props.product.manufacturer.title"
              loading="lazy"
            />
          </RouterLink>

          <div>
            Manufacturer:
            <RouterLink :to="`${URL_MANUFACTURER}/${props.product.manufacturer._id}`">
              {{ props.product.manufacturer.title }}
            </RouterLink>
            ({{ props.product.manufacturer.country }})
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

        <UiButton @click="mutate(props.product._id)">Add to cart</UiButton>

        <div>Delivery in 7 days. No Import Fees Deposit.</div>
      </div>
    </div>

    <h2 id="description">Description</h2>
    <div v-html="product.description"></div>
  </div>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';

import { UiButton, toast } from 'mhz-ui';
import { IProduct } from 'mhz-types';
import { isAuth } from 'mhz-helpers';

import ProductActionButtons from '@/product/components/ProductActionButtons.vue';

import { CURRENCY, PATH_UPLOAD } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';
import { addToCart } from '@/customer/services';
import { API_CUSTOMER_CART } from '@/customer/constants';

interface IProps {
  product: IProduct;
}

const props = defineProps<IProps>();

const queryClient = useQueryClient();

const { mutate } = addToCart({
  onSuccess: async () => {
    await queryClient.refetchQueries({ queryKey: [API_CUSTOMER_CART] });
    toast.success('Added to cart');
  },
});
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
</style>
