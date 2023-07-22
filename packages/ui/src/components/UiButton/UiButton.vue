<template>
  <button :class="$style.button" :data-layout="props.layout" :type="props.type" :disabled="props.isDisabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  layout?: 'primary' | 'secondary';
  type?: 'submit' | 'button';
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  layout: 'primary',
  type: 'button',
});
</script>

<style module lang="scss">
.button {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 48px;
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
  border-radius: 24px;
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
}
</style>
