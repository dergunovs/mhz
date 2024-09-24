<template>
  <div :class="$style.container">
    <div :class="$style.thumbs">
      <button
        v-for="(thumb, index) in props.thumbs"
        :key="thumb"
        @click="currentSlide = index"
        type="button"
        :class="$style.thumb"
        :data-active="currentSlide === index"
        data-test="ui-slider-thumb"
      >
        <img
          :src="props.path ? `${props.path}${thumb}` : thumb"
          width="64"
          height="64"
          :alt="`thumb-${index}`"
          crossorigin="anonymous"
        />
      </button>
    </div>

    <div :class="$style.slide">
      <img
        :src="props.path ? `${props.path}${props.slides[currentSlide]}` : props.slides[currentSlide]"
        :alt="`slide-${currentSlide}`"
        crossorigin="anonymous"
        :data-slide="currentSlide"
        data-test="ui-slider-slide"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
  thumbs: string[];
  slides: string[];
  path?: string;
}

const props = defineProps<IProps>();

const currentSlide = ref(0);
</script>

<style module lang="scss">
.container {
  display: flex;
  gap: 8px;
}

.thumbs {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 8px;
}

.thumb {
  padding: 8px;
  cursor: pointer;
  background: none;
  border: 1px solid var(--color-gray);
  border-radius: 8px;

  &:hover,
  &[data-active='true'] {
    border: 1px solid var(--color-gray-dark-extra);
  }
}

.slide {
  flex-grow: 1;
}

@media (max-width: $mobile) {
  .container {
    flex-direction: column;
    gap: 16px;
  }

  .thumbs {
    flex-direction: row;
  }
}
</style>
