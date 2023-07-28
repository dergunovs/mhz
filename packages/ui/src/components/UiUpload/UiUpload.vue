<template>
  <div :class="$style.upload">
    <div v-if="props.label">{{ props.label }}</div>

    <div :class="$style.uploadButton">
      <UiButton :layout="props.layout" :isDisabled="props.isDisabled" @click="emulateFileClickInput" :icon="IconUpload">
        Загрузить файл
      </UiButton>

      <div :class="$style.text">Формат jpg, png. Размер до 10 мб.</div>
    </div>

    <input
      ref="input"
      :class="$style.input"
      :key="inputKey"
      type="file"
      accept=".jpg,.png"
      @input="handleFileChange($event.target)"
    />

    <div v-for="(file, i) in files" :key="`${file}${i}`" :class="$style.files">
      <div :class="$style.name">{{ file.name }}</div>
      <UiButton @click="remove(file)" layout="plain">Удалить</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import UiButton from '../UiButton/UiButton.vue';

import IconUpload from './icons/upload.svg?component';

interface IProps {
  layout?: 'primary' | 'secondary';
  files: File[];
  isDisabled?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  layout: 'secondary',
  label: undefined,
});

const emit = defineEmits(['update', 'remove']);

const input = ref<HTMLElement>();
const inputKey = ref(0);

function emulateFileClickInput() {
  input?.value?.click?.();
}

async function remove(file: File) {
  emit('remove', file);
  inputKey.value++;
}

function handleFileChange(target: EventTarget | null) {
  const file = (target as HTMLInputElement).files?.[0];

  if (file?.size && file.size < 10 * 1024 * 1024) emit('update', file);
}
</script>

<style module lang="scss">
.upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.uploadButton {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.text {
  font-size: 0.75rem;
}

.input {
  display: none;
}

.name {
  flex: 1;
  font-size: 0.875rem;
}

.files {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
