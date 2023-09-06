<template>
  <div :class="$style.category">
    <div :class="$style.imageBlock">
      <img
        :src="`${PATH_UPLOAD}/${props.category.iconUrl}`"
        :class="$style.image"
        width="240"
        crossorigin="anonymous"
      />
    </div>

    <div v-html="props.category.description"></div>
  </div>
</template>

<script setup lang="ts">
import { ICategory } from 'mhz-types';

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
}
</style>
