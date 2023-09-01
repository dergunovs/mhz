<template>
  <div :class="$style.manufacturer">
    <img
      :src="`${PATH_UPLOAD}/${props.manufacturer.logoUrl}`"
      :class="$style.image"
      height="64"
      crossorigin="anonymous"
    />

    <div>Country: {{ props.manufacturer.country }}</div>

    <div v-html="props.manufacturer.description"></div>
  </div>
</template>

<script setup lang="ts">
import { IManufacturer } from 'mhz-types';

import { PATH_UPLOAD } from '@/common/constants';

interface IProps {
  manufacturer: IManufacturer;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.manufacturer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image {
  width: fit-content;
  height: 64px;
}
</style>
