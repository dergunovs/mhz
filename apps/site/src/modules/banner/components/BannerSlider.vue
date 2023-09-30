<template>
  <div :class="$style.slider">
    <BannerSlide
      v-for="(banner, index) in banners"
      :key="banner._id"
      :banner="banner"
      :isVisible="index === currentSlide"
    />

    <div :class="$style.bullets">
      <button
        v-for="index in banners?.length"
        :key="index"
        @click="currentSlide = index - 1"
        :class="$style.bullet"
        :data-current="index - 1 === currentSlide"
        type="button"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BannerSlide from '@/banner/components/BannerSlide.vue';

import { getBannersActive } from '@/banner/services';

const { data: banners } = getBannersActive();

const currentSlide = ref(0);
</script>

<style module lang="scss">
.slider {
  position: relative;
  width: 100%;
  border-radius: 8px;
}

.bullets {
  position: absolute;
  bottom: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.bullet {
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-color: var(--color-gray);
  border: none;
  border-radius: 50%;

  &[data-current='true'] {
    background-color: var(--color-accent-light);
  }

  &:hover:not(&[data-current='true']) {
    background-color: var(--color-gray-dark);
  }
}
</style>
