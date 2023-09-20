<template>
  <div :class="$style.manufacturer">
    <img
      :src="`${PATH_UPLOAD}/${props.manufacturer.logoUrl}`"
      :alt="props.manufacturer.title"
      :class="$style.image"
      width="125"
      height="100"
      crossorigin="anonymous"
    />

    <div>
      <div v-html="props.manufacturer.description"></div>
      <br />
      <div>Country: {{ props.manufacturer.country }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IManufacturer } from 'mhz-contracts';

import { PATH_UPLOAD } from '@/common/constants';

interface IProps {
  manufacturer: IManufacturer;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.manufacturer {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}
</style>
