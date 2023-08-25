<template>
  <div v-if="props.modelValue" @mousedown="emit('update:modelValue', false)" :class="$style.container">
    <div @mousedown.stop :class="$style.modal">
      <div :class="$style.header">
        <button @click="emit('update:modelValue', false)" :class="$style.close" type="button">×</button>
      </div>

      <slot></slot>

      <div v-if="props.isConfirm" :class="$style.buttons">
        <UiButton @click="handleConfirm">Confirm</UiButton>
        <UiButton layout="secondary" @click="emit('update:modelValue', false)">Cancel</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';

import UiButton from '../UiButton/UiButton.vue';

interface IProps {
  modelValue: boolean;
  isConfirm?: boolean;
}

const props = defineProps<IProps>();

const emit = defineEmits(['update:modelValue', 'confirm']);

const body = document.querySelector('body');

watch(
  () => props.modelValue,
  () => {
    const overflow = props.modelValue ? 'hidden' : 'auto';

    if (body) body.style.overflow = overflow;
  }
);

function handleConfirm() {
  emit('confirm');
  emit('update:modelValue', false);
}
</script>

<style module lang="scss">
.container {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: var(--color-gray-transparent);
}

.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 50%;
  max-width: calc(100% - 32px);
  height: auto;
  padding: 32px;
  background-color: var(--color-white);
  border-radius: 16px;
  outline: none;
  box-shadow: 0 0 16px 0 var(--color-gray-transparent);
}

.header {
  display: flex;
  justify-content: flex-end;
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 2rem;
  color: var(--color-white);
  cursor: pointer;
  background-color: var(--color-gray-dark);
  border: none;
  border-radius: 50%;

  &:hover {
    background-color: var(--color-gray-dark-extra);
  }
}

.buttons {
  display: flex;
  gap: 16px;
}
</style>
