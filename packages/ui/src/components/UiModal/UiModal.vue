<template>
  <div v-if="props.modelValue" @mousedown="debouncedHide" :class="$style.container" data-test="ui-modal-container">
    <div @mousedown.stop :class="$style.modal" data-test="ui-modal">
      <div :class="$style.header">
        <UiClose @click="debouncedHide" data-test="ui-modal-close" />
      </div>

      <div data-test="ui-modal-slot">
        <slot></slot>
      </div>

      <div v-if="props.isConfirm" :class="$style.buttons">
        <UiButton @click="handleConfirm" data-test="ui-modal-confirm">{{ confirmText }}</UiButton>

        <UiButton layout="secondary" @click="debouncedHide" data-test="ui-modal-cancel">
          {{ cancelText }}
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

import UiButton from '../UiButton/UiButton.vue';
import UiClose from '../UiClose/UiClose.vue';

interface IProps {
  modelValue: boolean;
  isConfirm?: boolean;
  width?: string;
  lang?: 'ru';
}

const props = defineProps<IProps>();

const emit = defineEmits<{ 'update:modelValue': [value: boolean]; confirm: [] }>();

const cancelText = computed(() => (props.lang === 'ru' ? 'Отмена' : 'Cancel'));
const confirmText = computed(() => (props.lang === 'ru' ? 'Подтвердить' : 'onfirm'));

const widthComputed = computed(() => (props.width ? `${props.width}px` : 'auto'));
const minWidthComputed = computed(() => (props.width ? `${props.width}px` : '50%'));

const body = document.querySelector('body');

const debounce = ref(false);

watch(
  () => props.modelValue,
  () => {
    const overflow = props.modelValue ? 'hidden' : 'auto';

    if (body) body.style.overflow = overflow;

    if (props.modelValue) {
      debounce.value = true;

      setTimeout(() => {
        debounce.value = false;
      }, 100);
    }
  }
);

function handleConfirm() {
  emit('confirm');
  emit('update:modelValue', false);
}

function debouncedHide() {
  if (!debounce.value) emit('update:modelValue', false);

  debounce.value = false;
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
  height: 100dvh;
  background-color: var(--color-gray-transparent);
}

.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: v-bind(widthComputed);
  min-width: v-bind(minWidthComputed);
  max-width: calc(100% - 32px);
  height: auto;
  padding: 24px;
  outline: none;
  background-color: var(--color-white);
  border-radius: 16px;
  box-shadow: 0 0 16px 0 var(--color-gray-transparent);
}

.header {
  display: flex;
  justify-content: flex-end;
}

.buttons {
  display: flex;
  gap: 16px;
}
</style>
