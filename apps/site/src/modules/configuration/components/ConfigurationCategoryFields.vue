<template>
  <div>
    <div v-for="field in props.product?.fields" :key="field.title">
      {{ field.title }} {{ field.fieldValue }} {{ field.fieldUnits }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from 'mhz-types';

interface IProps {
  product?: IProduct;
}

const props = defineProps<IProps>();
</script>
