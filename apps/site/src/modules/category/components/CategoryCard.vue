<template>
  <div :class="$style.category">
    <img :src="`${PATH_UPLOAD}/${props.category.iconUrl}`" :class="$style.image" height="128" loading="lazy" />

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
  flex-direction: column;
  gap: 16px;
}

.image {
  width: fit-content;
  height: 128px;
}
</style>
