<template>
  <div
    @click="emit('toggle')"
    @keydown.space="emit('toggle')"
    :class="$style.inputBlock"
    :data-mode="props.mode"
    :tabindex="props.mode === 'default' ? '-1' : '0'"
    data-test="ui-input-block"
  >
    <input
      :value="props.modelValue"
      @input="handleInput($event.target)"
      :disabled="props.isDisabled"
      :class="$style.input"
      ref="input"
      v-bind="$attrs"
      :type="props.isPassword && !isShowPassword ? 'password' : props.type"
      :data-mode="props.mode"
      :data-center="props.isCenter"
      :data-append-icon="!!props.appendIcon || props.isCopy || props.isPassword"
      :tabindex="props.mode === 'default' ? '0' : '-1'"
      data-test="ui-input"
      aria-label="input"
    />

    <component
      v-if="props.appendIcon || props.isCopy || props.isPassword"
      :is="icon"
      @click="handleIconClick"
      :class="$style.icon"
      :data-copy="props.isCopy"
      :data-password="props.isPassword"
      data-test="ui-input-icon"
    />
  </div>
</template>

<script setup lang="ts">
import { FunctionalComponent, onMounted, nextTick, ref, computed } from 'vue';

import IconCopy from './icons/copy.svg?component';
import IconPasswordHide from './icons/password-hide.svg?component';
import IconPasswordShow from './icons/password-show.svg?component';

interface IProps {
  modelValue?: string | number | boolean | null;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';
  isDisabled?: boolean;
  mode?: 'default' | 'select';
  appendIcon?: FunctionalComponent;
  isFocus?: boolean;
  isCenter?: boolean;
  isCopy?: boolean;
  isPassword?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  type: 'text',
  mode: 'default',
  appendIcon: undefined,
});

const emit = defineEmits<{ 'update:modelValue': [value: string | number]; toggle: [] }>();

const input = ref<HTMLElement>();

const isShowPassword = ref(false);

const icon = computed(() => {
  if (props.isCopy) return IconCopy;
  if (props.isPassword && isShowPassword.value) return IconPasswordHide;
  if (props.isPassword && !isShowPassword.value) return IconPasswordShow;

  return props.appendIcon;
});

function handleInput(target: EventTarget | null) {
  emit('update:modelValue', (target as HTMLInputElement).value);
}

function handleIconClick() {
  if (props.isCopy && props.modelValue) navigator.clipboard.writeText(props.modelValue.toString());
  if (props.isPassword) isShowPassword.value = !isShowPassword.value;
}

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
  height: 40px;
  padding: 0 16px;
  font-size: 1rem;
  outline: none;
  border: 1px solid var(--color-gray);
  border-radius: 16px;

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

  &[data-center='true'] {
    text-align: center;
  }
}

.icon {
  position: absolute;
  top: calc(50% - 8px);
  right: 12px;
  cursor: pointer;

  &[data-password='true'] {
    top: calc(50% - 12px);
    width: 24px;
    height: 24px;
  }
}
</style>
