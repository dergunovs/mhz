<template>
  <div :class="$style.category">
    <img
      :src="`${PATH_UPLOAD}/${props.category.iconUrl}`"
      :alt="props.category.title"
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
</style>
