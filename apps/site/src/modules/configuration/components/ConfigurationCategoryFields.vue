<template>
  <div>
    <div v-for="field in fields" :key="field.title">
      {{ field.title }} {{ field.fieldValue }} {{ field.fieldUnits }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { IProduct } from 'mhz-types';

import { CONFIGURATION_PRODUCT_FIELDS } from '@/configuration/constants';

interface IProps {
  product?: IProduct;
}

const props = defineProps<IProps>();

function filterFields(title?: string) {
  return title
    ? props.product?.fields?.filter((category) => CONFIGURATION_PRODUCT_FIELDS[title]?.includes(category.title))
    : [];
}

const fields = computed(() => filterFields(props.product?.category?.title));
</script>
