<template>
  <div :class="$style.container">
    <button
      @click="emit('update:modelValue', !props.modelValue)"
      :class="$style.titleBlock"
      type="button"
      data-test="ui-spoiler-button"
    >
      <div :class="$style.title">
        <IconArrow :data-expanded="props.modelValue" :class="$style.icon" width="16" height="16" />
        <span :class="$style.titleText" data-test="ui-spoiler-button-title">{{ props.title }}</span>
      </div>
    </button>

    <div v-show="props.modelValue" :class="$style.spoiler" data-test="ui-spoiler">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconArrow from './icons/arrow.svg?component';

interface IProps {
  modelValue: boolean;
  title: string;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.titleBlock {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0;
  background-color: var(--color-gray-light-extra);
  border: 0;

  &:hover {
    background-color: var(--color-gray-light);
  }
}

.title {
  position: relative;
  z-index: 1;
  display: flex;
  flex-grow: 1;
  gap: 8px;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  font-size: 1rem;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  background: none;
  border: none;
}

.titleText {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-height: 1.2;
  -webkit-box-orient: vertical;
}

.icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  transform: rotate(-90deg);

  &[data-expanded='true'] {
    transform: rotate(0deg);
  }
}

.spoiler {
  padding: 8px 0;
}
</style>
