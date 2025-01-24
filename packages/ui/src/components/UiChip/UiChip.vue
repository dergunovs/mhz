<template>
  <div :class="$style.chip" :data-type="props.type" data-test="ui-chip">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_TYPE } from './constants';

interface IProps {
  type?: 'default' | 'success' | 'error';
}

const props = withDefaults(defineProps<IProps>(), {
  type: DEFAULT_TYPE,
});
</script>

<style module lang="scss">
.chip {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 2px 8px;
  font-size: 0.875rem;
  background-color: var(--color-gray-light);
  border-bottom: 1px solid var(--color-gray-dark);
  border-radius: 8px;

  &[data-type='success'] {
    color: var(--color-success-dark);
  }

  &[data-type='error'] {
    color: var(--color-error-dark);
  }
}
</style>
