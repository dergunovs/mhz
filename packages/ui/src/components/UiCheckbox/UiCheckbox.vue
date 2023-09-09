<template>
  <label @click.stop :data-disabled="props.isDisabled" :class="$style.checkbox">
    <span v-if="props.error" :class="$style.required">{{ props.error }}</span>

    <span v-if="props.label">
      <span>{{ props.label }}</span>
      <span v-if="props.subLabel" :class="$style.subLabel">{{ props.subLabel }}</span>
      <span v-if="props.isRequired" :class="$style.required">*</span>
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
    />

    <div
      @keydown.space="checkbox?.click()"
      :data-switcher="props.isSwitcher"
      :data-disabled="props.isDisabled"
      :data-error="props.error"
      :class="$style.fake"
      tabindex="0"
    >
      <div v-if="!props.isSwitcher" :class="[$style.line, $style.leftLine]"></div>
      <div v-if="!props.isSwitcher" :class="[$style.line, $style.rightLine]"></div>
    </div>

    <span v-if="props.labelSwitcher">
      {{ props.labelSwitcher }}<span v-if="props.isRequired" :class="$style.required">*</span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type InitialValue = boolean | string | number;

interface IProps {
  initialValue?: InitialValue;
  modelValue?: InitialValue;
  label?: string;
  subLabel?: string;
  labelSwitcher?: string;
  error?: string | boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isSwitcher?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  initialValue: false,
  label: '',
  subLabel: '',
  labelSwitcher: '',
  error: false,
});

const emit = defineEmits(['update:modelValue']);

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
  z-index: 1;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  cursor: pointer;
  border: 1px solid var(--color-gray-dark);
  border-radius: 4px;
  outline: none;

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

.subLabel {
  font-size: 0.875rem;
  color: var(--color-gray-dark-extra);
}

.required {
  color: var(--color-error);
}
</style>
