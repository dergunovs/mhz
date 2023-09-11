<template>
  <div>{{ props.order }}</div>
</template>

<script setup lang="ts">
import { IOrder } from 'mhz-types';

interface IProps {
  order: IOrder;
}

const props = defineProps<IProps>();
</script>
