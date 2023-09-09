<template>
  <div :class="$style.manufacturer">
    <div :class="$style.imageBlock">
      <img
        :src="`${PATH_UPLOAD}/${props.manufacturer.logoUrl}`"
        :alt="props.manufacturer.title"
        :class="$style.image"
        width="96"
        crossorigin="anonymous"
      />
    </div>

    <div>
      <div v-html="props.manufacturer.description"></div>
      <div>Country: {{ props.manufacturer.country }}</div>
    </div>
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
  gap: 32px;
}

.imageBlock {
  display: flex;
  flex-shrink: 0;
  max-width: 240px;
  height: 96px;
}

.image {
  width: fit-content;
  height: fit-content;
  max-height: 96px;
}
</style>
