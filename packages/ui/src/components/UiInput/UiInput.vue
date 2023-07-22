<template>
  <div :class="$style.inputBlock">
    <input
      :value="props.modelValue"
      @input="handleInput($event.target)"
      :disabled="props.isDisabled"
      :class="$style.input"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  modelValue: string | number | null;
  isDisabled?: boolean;
}

const props = defineProps<IProps>();

const emit = defineEmits(['update:modelValue']);

function handleInput(target: EventTarget | null) {
  emit('update:modelValue', (target as HTMLInputElement).value);
}
</script>

<style module lang="scss">
.inputBlock {
  position: relative;
  width: 100%;
}

.input {
  width: 100%;
  height: 48px;
  padding: 0 24px;
  font-size: 1rem;
  border: 1px solid var(--color-gray);
  border-radius: 24px;
  outline: none;

  &:hover {
    border: 1px solid var(--color-gray-dark-extra);
  }

  &:focus {
    border: 1px solid var(--color-primary);
  }

  &:disabled {
    color: var(--color-gray-dark-extra);
    background: var(--color-gray-light-extra);
    border-color: var(--color-transparent);
  }

  &::placeholder {
    color: var(--color-gray-dark-extra);
  }
}
</style>
