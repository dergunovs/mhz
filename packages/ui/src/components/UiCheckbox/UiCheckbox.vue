<template>
  <label @click.stop :data-disabled="props.isDisabled" :class="$style.checkbox" data-test="ui-checkbox">
    <span v-if="props.error" :class="$style.required" data-test="ui-checkbox-error">{{ props.error }}</span>

    <span v-if="props.label">
      <span data-test="ui-checkbox-label">{{ props.label }}</span>
      <span v-if="props.labelSub" :class="$style.labelSub" data-test="ui-checkbox-label-sub">{{ props.labelSub }}</span>
      <span v-if="props.isRequired" :class="$style.required" data-test="ui-checkbox-required">*</span>
    </span>

    <input
      @change="handleChange"
      type="checkbox"
      ref="checkbox"
      :value="props.initialValue"
      :checked="!!props.modelValue"
      :disabled="props.isDisabled"
      :class="$style.input"
      tabindex="-1"
      data-test="ui-checkbox-input"
    />

    <div
      @keydown.space="checkbox?.click()"
      :data-switcher="props.isSwitcher"
      :data-disabled="props.isDisabled"
      :data-error="!!props.error"
      :class="$style.fake"
      tabindex="0"
      data-test="ui-checkbox-fake"
    >
      <div v-if="!props.isSwitcher" :class="[$style.line, $style.leftLine]" data-test="ui-checkbox-line"></div>
      <div v-if="!props.isSwitcher" :class="[$style.line, $style.rightLine]" data-test="ui-checkbox-line"></div>
    </div>

    <span v-if="props.labelSwitcher">
      <span data-test="ui-checkbox-label-switcher">{{ props.labelSwitcher }}</span>
      <span v-if="props.isRequired" :class="$style.required" data-test="ui-checkbox-required-switcher">*</span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DEFAULT_LABEL, DEFAULT_MODEL_VALUE } from './constants';

type TInitialValue = boolean | string | number;

interface IProps {
  initialValue?: TInitialValue;
  modelValue?: TInitialValue;
  label?: string;
  labelSub?: string;
  labelSwitcher?: string;
  error?: string | boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isSwitcher?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: DEFAULT_MODEL_VALUE,
  initialValue: DEFAULT_MODEL_VALUE,
  label: DEFAULT_LABEL,
  labelSub: DEFAULT_LABEL,
  labelSwitcher: DEFAULT_LABEL,
  error: false,
});

const emit = defineEmits<{ 'update:modelValue': [value: TInitialValue] }>();

const checkbox = ref<HTMLInputElement>();

function handleChange() {
  if (checkbox.value) {
    let value;

    if (checkbox.value.checked) {
      value = props.initialValue ? props.initialValue : true;
    } else {
      value = false;
    }

    emit('update:modelValue', value);
  }
}
</script>

<style module lang="scss">
.checkbox {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
  width: fit-content;
  cursor: pointer;
  user-select: none;

  &:hover {
    .fake {
      border-color: var(--color-primary);

      &[data-switcher='true'] {
        background-color: var(--color-gray-dark);
        border: none;
      }

      &[data-disabled='true']:not([data-switcher='true']) {
        border-color: var(--color-gray);
      }
    }

    .input:checked + .fake {
      background-color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);

      &[data-disabled='true'][data-switcher='true'] {
        background-color: var(--color-gray);
      }

      &[data-disabled='true']:not([data-switcher='true']) {
        background-color: var(--color-gray);
        border-color: var(--color-gray);
      }
    }
  }

  &[data-disabled='true'] {
    color: var(--color-gray-dark);
  }
}

.input {
  position: absolute;
  z-index: 1;
  appearance: none;
  border: none;

  &:checked + .fake {
    position: relative;
    background-color: var(--color-primary);
    border-color: var(--color-primary);

    .line {
      position: absolute;
      height: 2px;
      background-color: var(--color-white);
      border-radius: 2px;
    }

    .leftLine {
      top: 55%;
      left: 10%;
      width: 40%;
      transform: rotate(45deg);
    }

    .rightLine {
      top: 45%;
      left: 30%;
      width: 65%;
      transform: rotate(-45deg);
    }

    &[data-switcher='true']::before {
      transform: translateX(20px);
    }
  }
}

.fake {
  z-index: 0;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  cursor: pointer;
  outline: none;
  border: 1px solid var(--color-gray-dark);
  border-radius: 4px;

  &:focus {
    width: 20px;
    height: 20px;
    outline: auto;
  }

  &[data-switcher='true'] {
    position: relative;
    width: 40px;
    height: 20px;
    background-color: var(--color-gray);
    border: none;
    border-radius: 16px;
    transition: all 300ms;

    &::before {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 12px;
      height: 12px;
      content: '';
      background-color: var(--color-white);
      border-radius: 50%;
      transition: all 200ms;
    }
  }

  &[data-disabled='true']:not([data-switcher='true']) {
    background-color: var(--color-gray);
    border-color: var(--color-gray);

    &:focus {
      outline: none;
    }
  }

  &[data-disabled='true'][data-switcher='true'] {
    background-color: var(--color-gray);
    border-color: var(--color-gray);

    &:focus {
      outline: none;
    }
  }

  &[data-error='true'] {
    border-color: var(--color-error);
  }
}

.labelSub {
  font-size: 0.875rem;
  color: var(--color-gray-dark-extra);
}

.required {
  color: var(--color-error);
}
</style>
