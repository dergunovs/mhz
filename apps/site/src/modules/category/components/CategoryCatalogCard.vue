<template>
  <RouterLink :to="`${URL_CATEGORY}/${props.category._id}`" :class="$style.card" :data-header="props.isHeader">
    <img
      :src="`${PATH_UPLOAD}/${props.category.iconUrl}`"
      :alt="props.category.title"
      loading="lazy"
      :width="props.isHeader ? 24 : 64"
      :height="props.isHeader ? 24 : 64"
      crossorigin="anonymous"
    />

    <div :class="$style.title">{{ props.category.title }}</div>
  </RouterLink>
</template>

<script setup lang="ts">
import { ICategory } from 'mhz-contracts';

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
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-decoration: none;

  &[data-header='true'] {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 240px;
    padding: 4px 16px;

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

.title {
  font-size: 1.125rem;
  color: var(--color-black);
  text-align: center;
}

@media (max-width: $tablet) {
  .card {
    &[data-header='true'] {
      padding: 2px 16px;
    }
  }
}

@media (max-width: $mobile) {
  .card {
    &[data-header='true'] {
      .title {
        font-size: 1.125rem;
      }
    }
  }
}
</style>
