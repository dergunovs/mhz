<template>
  <button
    :class="$style.button"
    :data-layout="props.layout"
    :data-accent="props.isAccent"
    :disabled="props.isDisabled"
    :type="props.type"
    data-test="ui-button"
  >
    <component v-if="props.icon" :is="props.icon" data-test="ui-button-icon" />

    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { FunctionalComponent } from 'vue';

import { DEFAULT_LAYOUT, DEFAULT_TYPE, DEFAULT_ICON } from './constants';

interface IProps {
  layout?: 'primary' | 'secondary' | 'plain';
  type?: 'submit' | 'button';
  isDisabled?: boolean;
  isAccent?: boolean;
  icon?: FunctionalComponent;
}

const props = withDefaults(defineProps<IProps>(), {
  layout: DEFAULT_LAYOUT,
  type: DEFAULT_TYPE,
  icon: DEFAULT_ICON,
});
</script>

<style module lang="scss">
.button {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 16px 32px;
  overflow: hidden;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-white);
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  background: var(--color-primary);
  border: 2px solid var(--color-transparent);
  border-radius: 16px;
  transition: all 200ms;

  &:hover {
    color: var(--color-white);
    cursor: pointer;
    background: var(--color-primary-dark);
    border-color: var(--color-transparent);
  }

  &:disabled {
    color: var(--color-gray-dark-extra);
    cursor: default;
    background: var(--color-gray-light-extra);
  }

  &[data-accent='true'] {
    background-color: var(--color-accent);

    &:hover {
      background: var(--color-accent-dark);
    }
  }

  &[data-layout='secondary'] {
    color: var(--color-primary);
    background-color: var(--color-white);
    border-color: var(--color-primary);

    &:hover {
      color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
    }

    &:disabled {
      color: var(--color-gray-dark-extra);
      background: var(--color-white);
      border-color: var(--color-gray-light-extra);
    }
  }

  &[data-layout='plain'] {
    height: auto;
    padding: 0;
    font-size: 1rem;
    color: var(--color-primary);
    text-decoration: underline;
    background: none;
    border: none;
    border-radius: 0;

    &:hover {
      color: var(--color-primary-dark);
    }

    &:disabled {
      color: var(--color-gray-dark-extra);
    }
  }
}
</style>
