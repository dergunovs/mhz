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
      >
        <img
          :src="props.path ? `${props.path}${thumb}` : thumb"
          width="64"
          height="64"
          :alt="`Thumb-${index}`"
          crossorigin="anonymous"
        />
      </button>
    </div>

    <div :class="$style.slide">
      <img
        :src="props.path ? `${props.path}${props.slides[currentSlide]}` : props.slides[currentSlide]"
        :alt="`Slide-${currentSlide}`"
        crossorigin="anonymous"
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
  flex-direction: column;
  flex-shrink: 0;
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
</style>
