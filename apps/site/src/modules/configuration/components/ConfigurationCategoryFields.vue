<template>
  <div>
    <div
      v-for="field in fields"
      :key="field.title"
      :class="$style.field"
      :data-error="errorTitle?.includes(field.title)"
    >
      {{ field.title }} {{ field.fieldValue }} {{ field.fieldUnits }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { IProduct } from 'mhz-contracts';

import { CONFIGURATION_PRODUCT_FIELDS } from '@/configuration/constants';
import { IConfigurationError } from '@/configuration/interface';

interface IProps {
  product?: IProduct;
  errors?: IConfigurationError[];
}

const props = defineProps<IProps>();

function filterFields(title?: string) {
  return title
    ? props.product?.fields?.filter((category) => CONFIGURATION_PRODUCT_FIELDS[title]?.includes(category.title))
    : [];
}

const fields = computed(() => filterFields(props.product?.category?.title));

const errorTitle = computed(() => {
  return props.errors
    ?.filter(
      (error) =>
        props.product?.category.title === error.category &&
        props.product.fields?.map((field) => field.title).includes(error.field)
    )
    .map((error) => error.field);
});
</script>

<style module lang="scss">
.field {
  font-size: 0.875rem;
  color: var(--color-gray-dark-extra);

  &[data-error='true'] {
    color: var(--color-error);
  }
}
</style>
