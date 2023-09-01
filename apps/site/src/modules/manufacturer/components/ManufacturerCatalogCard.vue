<template>
  <RouterLink :to="`${URL_MANUFACTURER}/${props.manufacturer._id}`" :class="$style.card">
    <div :class="$style.imageBlock">
      <img
        :src="`${PATH_UPLOAD}/${props.manufacturer.logoUrl}`"
        :class="$style.image"
        :alt="props.manufacturer.title"
        loading="lazy"
        crossorigin="anonymous"
      />
    </div>

    <div :class="$style.title">{{ props.manufacturer.title }} ({{ props.manufacturer.country }})</div>
  </RouterLink>
</template>

<script setup lang="ts">
import { IManufacturer } from 'mhz-types';

import { PATH_UPLOAD } from '@/common/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

interface IProps {
  manufacturer: IManufacturer;
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
