<template>
  <div :class="$style.container">
    <div :class="$style.upload">
      <div v-if="props.label">
        <span>{{ props.label }}</span>
        <span v-if="props.isRequired" :class="$style.error">*</span>
      </div>

      <div :class="$style.addButton">
        <UiButton
          :layout="props.layout"
          :isDisabled="
            props.isDisabled || (props.isSingle && props.files.length >= 1) || (props.isSingle && !!props.file)
          "
          @click="emulateFileClickInput"
          :icon="IconUpload"
        >
          Add file
        </UiButton>

        <div :class="$style.text" :data-error="!!props.error">Size up to 10 Mb, jpg, png</div>
      </div>

      <input
        ref="input"
        :class="$style.input"
        :key="inputKey"
        type="file"
        accept=".jpg,.png"
        @input="handleFileChange($event.target)"
      />

      <template v-if="props.files?.length && !props.file">
        <div v-for="(fileToUpload, index) in files" :key="`${fileToUpload}-${index}`" :class="$style.files">
          <div :class="$style.name">{{ fileToUpload.name }}</div>
          <UiButton @click="remove(fileToUpload)" layout="plain">Remove</UiButton>
        </div>
      </template>

      <div v-if="props.isSingle && props.file" :class="$style.files">
        <div :class="$style.name">{{ props.file.name }}</div>
        <UiButton @click="remove(props.file)" layout="plain">Remove</UiButton>
      </div>
    </div>

    <div
      v-show="(props.isSingle && props.file) || !!props.files.length"
      :class="$style.uploadButton"
      :data-label="!!props.label"
    >
      <UiButton @click="emit('upload')">Upload</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import UiButton from '../UiButton/UiButton.vue';

import IconUpload from './icons/upload.svg?component';

interface IProps {
  layout?: 'primary' | 'secondary';
  label?: string;
  file?: File;
  files?: File[] | never[];
  error?: string | boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isSingle?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  layout: 'secondary',
  label: undefined,
  error: undefined,
  file: undefined,
  files: () => [],
});

const emit = defineEmits(['add', 'remove', 'upload']);

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

  if (file?.size && file.size < 10 * 1024 * 1024) emit('add', file);
}
</script>

<style module lang="scss">
.container {
  display: flex;
  gap: 16px;
}

.upload {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.addButton {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.text {
  font-size: 0.75rem;

  &[data-error='true'] {
    color: var(--color-error);
  }
}

.input {
  display: none;
}

.name {
  flex: 1;
  max-width: 136px;
  overflow: hidden;
  font-size: 0.875rem;
  text-overflow: ellipsis;
}

.files {
  display: flex;
  gap: 8px;
  align-items: center;
}

.error {
  color: var(--color-error);
}

.uploadButton {
  &[data-label='true'] {
    margin-top: 28px;
  }
}
</style>
