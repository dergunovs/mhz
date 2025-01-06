<template>
  <div :class="$style.range">
    <Slider
      :modelValue="props.modelValue"
      @update:modelValue="(value: [number, number]) => emit('update:modelValue', value)"
      :min="props.min"
      :max="props.max"
      tooltipPosition="bottom"
      data-test="ui-range"
    />
  </div>
</template>

<script setup lang="ts">
import Slider from '@vueform/slider';

interface IProps {
  modelValue: [number, number];
  min: number;
  max: number;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ 'update:modelValue': [value: [number, number]] }>();
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style module lang="scss">
:root {
  --slider-bg: var(--color-gray-light);
  --slider-connect-bg: var(--color-gray-dark);
  --slider-tooltip-bg: var(--color-gray-light);
  --slider-tooltip-color: var(--color-black);
  --slider-handle-bg: var(--color-primary);
  --slider-handle-shadow: none;
  --slider-handle-shadow-active: none;
  --slider-tooltip-font-weight: 400;
  --slider-tooltip-radius: 4px;
  --slider-tooltip-px: 4px;
  --slider-tooltip-arrow-size: 4px;
  --slider-tooltip-distance: 2px;
}

.range {
  width: 100%;
}
</style>
