<template>
  <RouterLink :to="`${URL_MANUFACTURER}/${props.manufacturer._id}`" :class="$style.card">
    <img
      :src="`${PATH_UPLOAD}/${props.manufacturer.logoUrl}`"
      :class="$style.image"
      :alt="props.manufacturer.title"
      width="500"
      height="400"
      crossorigin="anonymous"
    />

    <div :class="$style.title" v-if="props.isShowTitle">
      {{ props.manufacturer.title }} ({{ props.manufacturer.country }})
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { IManufacturer } from 'mhz-contracts';

import { PATH_UPLOAD } from '@/common/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

interface IProps {
  manufacturer: IManufacturer;
  isShowTitle?: boolean;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-decoration: none;

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

.image {
  width: 50%;
}
</style>
