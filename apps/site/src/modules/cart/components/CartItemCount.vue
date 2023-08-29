<template>
  <div :class="$style.count">
    <button @click="emit('update', props.count - 1)" :disabled="props.count === 1" type="button" :class="$style.button">
      -
    </button>

    <div :class="$style.input">
      <UiInput :modelValue="props.count" isCenter />
    </div>

    <button @click="emit('update', props.count + 1)" type="button" :class="$style.button">+</button>
  </div>
</template>

<script setup lang="ts">
import { UiInput } from 'mhz-ui';

interface IProps {
  count: number;
  id: string;
}

const props = defineProps<IProps>();

const emit = defineEmits(['update']);
</script>

<style module lang="scss">
.count {
  display: flex;
  gap: 8px;
}

.input {
  width: 64px;
  pointer-events: none;
}

.button {
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: var(--color-gray);
  border: none;
  border-radius: 16px;

  &:hover {
    background-color: var(--color-gray-dark);
  }

  &:disabled {
    cursor: default;
    background-color: var(--color-gray-light);
  }
}
</style>
