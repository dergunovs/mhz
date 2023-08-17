<template>
  <div
    @click="emit('toggle')"
    @keydown.space="emit('toggle')"
    :class="$style.inputBlock"
    :data-mode="props.mode"
    :tabindex="props.mode === 'default' ? '-1' : '0'"
  >
    <input
      :value="props.modelValue"
      @input="handleInput($event.target)"
      :disabled="props.isDisabled"
      :class="$style.input"
      v-bind="$attrs"
      ref="input"
      :data-mode="props.mode"
      :data-append-icon="!!props.appendIcon"
      :tabindex="props.mode === 'default' ? '0' : '-1'"
    />

    <component v-if="props.appendIcon" :is="props.appendIcon" :class="$style.icon" />
  </div>
</template>

<script setup lang="ts">
import { FunctionalComponent, onMounted, nextTick, ref } from 'vue';

interface IProps {
  modelValue?: string | number | boolean | null;
  isDisabled?: boolean;
  mode?: 'default' | 'select' | 'multiselect';
  appendIcon?: FunctionalComponent;
  isFocus?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  mode: 'default',
  appendIcon: undefined,
});

const emit = defineEmits(['update:modelValue', 'toggle']);

function handleInput(target: EventTarget | null) {
  emit('update:modelValue', (target as HTMLInputElement).value);
}

const input = ref<HTMLElement>();

onMounted(async () => {
  if (props.isFocus) {
    await nextTick();
    input.value?.focus();
  }
});
</script>

<style module lang="scss">
.inputBlock {
  position: relative;
  display: flex;
  width: 100%;
  border-radius: 16px;

  &[data-mode='select'] {
    cursor: pointer;

    &:hover {
      .input {
        border: 1px solid var(--color-gray-dark-extra);
      }
    }
  }
}

.input {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  font-size: 1rem;
  border: 1px solid var(--color-gray);
  border-radius: 16px;
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

  &[data-mode='select'] {
    pointer-events: none;
  }

  &[data-append-icon='true'] {
    padding-right: 40px;
  }
}

.icon {
  position: absolute;
  top: calc(50% - 4px);
  right: 16px;
}
</style>
