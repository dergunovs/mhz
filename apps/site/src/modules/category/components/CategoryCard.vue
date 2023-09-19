<template>
  <div :class="$style.category">
    <div :class="$style.imageBlock">
      <img
        :src="`${PATH_UPLOAD}/${props.category.iconUrl}`"
        :alt="props.category.title"
        :class="$style.image"
        width="96"
        crossorigin="anonymous"
      />
    </div>

    <div v-html="props.category.description"></div>
  </div>
</template>

<script setup lang="ts">
import { ICategory } from 'mhz-contracts';

import { PATH_UPLOAD } from '@/common/constants';

interface IProps {
  category: ICategory;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.category {
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
