<template>
  <div :class="$style.category">
    <img
      :src="`${PATH_UPLOAD}/${props.category.iconUrl}`"
      :alt="props.category.title"
      :class="$style.image"
      height="80"
      width="80"
      crossorigin="anonymous"
    />

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
  align-items: flex-start;
}

.image {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
}

@media (max-width: $mobile) {
  .category {
    flex-direction: column;
    order: 2;
  }
}
</style>
