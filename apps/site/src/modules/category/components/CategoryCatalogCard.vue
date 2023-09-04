<template>
  <RouterLink :to="`${URL_CATEGORY}/${props.category._id}`" :class="$style.card" :data-header="props.isHeader">
    <div :class="$style.imageBlock" :data-header="props.isHeader">
      <img
        :src="`${PATH_UPLOAD}/${props.category.iconUrl}`"
        :class="$style.image"
        :data-header="props.isHeader"
        :alt="props.category.title"
        loading="lazy"
        :height="props.isHeader ? 24 : 100"
        crossorigin="anonymous"
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
  isHeader?: boolean;
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

  &[data-header='true'] {
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: flex-start;
    width: 240px;
    padding: 2px 16px;

    .title {
      font-size: 1rem;
    }

    &:global(.router-link-active) {
      .title {
        color: var(--color-primary);
      }
    }
  }

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
  height: 100px;

  &[data-header='true'] {
    width: 24px;
    height: 24px;
  }
}

.image {
  max-width: 80%;
  max-height: 100px;

  &[data-header='true'] {
    width: fit-content;
    max-width: 24px;
    max-height: 24px;
  }
}

.title {
  font-size: 1.125rem;
  color: var(--color-black);
  text-align: center;
}
</style>
