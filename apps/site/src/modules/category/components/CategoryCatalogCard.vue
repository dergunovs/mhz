<template>
  <RouterLink :to="`${URL_CATEGORY}/${props.category._id}`" :class="$style.card">
    <div :class="$style.imageBlock">
      <img
        :src="`${PATH_UPLOAD}/${props.category.iconUrl}`"
        :class="$style.image"
        :alt="props.category.title"
        loading="lazy"
      />
    </div>

    <div :class="$style.title">{{ props.category.title }}</div>
  </RouterLink>
</template>

<script setup lang="ts">
import { ICategory } from 'mhz-types';

import { PATH_UPLOAD } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';

interface IProps {
  category: ICategory;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
  text-decoration: none;

  &:hover {
    .title {
      color: var(--primary-dark);
    }
  }
}

.imageBlock {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.image {
  max-width: 80%;
  max-height: 100px;
}

.title {
  font-size: 1.125rem;
  color: var(--color-black);
  text-align: center;
}
</style>
