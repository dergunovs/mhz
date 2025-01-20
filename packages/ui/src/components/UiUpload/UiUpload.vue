<template>
  <div :class="$style.container">
    <div :class="$style.upload">
      <div v-if="props.label">
        <span data-test="ui-upload-label">{{ props.label }}</span>
        <span v-if="props.isRequired" :class="$style.error" data-test="ui-upload-required">*</span>
      </div>

      <div :class="$style.addButton">
        <UiButton
          @click="emulateFileClickInput"
          layout="secondary"
          :isDisabled="
            props.isDisabled || (props.isSingle && props.files.length >= 1) || (props.isSingle && !!props.file)
          "
          :icon="IconUpload"
          data-test="ui-upload-add"
        >
          Add file<template v-if="!props.isSingle">s</template>
        </UiButton>

        <div :class="$style.text" :data-error="!!props.error" data-test="ui-upload-text">
          Size up to {{ FILE_SIZE_LIMIT / (1024 * 1024) }} Mb, {{ props.extensions.join(', ') }}.
        </div>
      </div>

      <input
        type="file"
        @input="handleFileChange($event.target)"
        ref="input"
        :class="$style.input"
        :key="inputKey"
        :accept="accept"
        :multiple="!props.isSingle"
        data-test="ui-upload-input"
      />

      <template v-if="props.files?.length && !props.file">
        <div
          v-for="(fileToUpload, index) in files"
          :key="`${fileToUpload}-${index}`"
          :class="$style.file"
          data-test="ui-upload-file"
        >
          <div :class="$style.name" data-test="ui-upload-file-name">{{ fileToUpload.name }}</div>
          <UiButton @click="remove(fileToUpload)" layout="plain" data-test="ui-upload-file-remove">Remove</UiButton>
        </div>
      </template>

      <div v-if="props.isSingle && props.file" :class="$style.file" data-test="ui-upload-file-single">
        <div :class="$style.name" data-test="ui-upload-file-name-single">{{ props.file.name }}</div>
        <UiButton @click="remove(props.file)" layout="plain" data-test="ui-upload-file-remove-single">Remove</UiButton>
      </div>
    </div>

    <div
      v-show="(props.isSingle && props.file) || !!props.files.length"
      :class="$style.uploadButton"
      :data-label="!!props.label"
    >
      <UiButton @click="emit('upload')" data-test="ui-upload">Upload</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import UiButton from '../UiButton/UiButton.vue';
import { FILE_SIZE_LIMIT } from './constants';
import IconUpload from './icons/upload.svg?component';

interface IProps {
  label?: string;
  file?: File;
  files?: File[] | never[];
  extensions?: string[];
  error?: string | boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isSingle?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  label: undefined,
  error: undefined,
  file: undefined,
  files: () => [],
  extensions: () => ['jpg', 'png'],
});

const emit = defineEmits<{ add: [file: File]; remove: [file: File]; upload: [] }>();

const input = ref<HTMLElement>();
const inputKey = ref(0);

const accept = computed(() => props.extensions.map((extension) => `.${extension}`).join());

function emulateFileClickInput() {
  input?.value?.click?.();
}

async function remove(file?: File) {
  if (!file) return;

  emit('remove', file);
  inputKey.value++;
}

function handleFileChange(target: EventTarget | null) {
  if (props.isSingle) {
    const file = (target as HTMLInputElement).files?.[0];

    if (file?.size && file.size < FILE_SIZE_LIMIT) emit('add', file);
  } else {
    const files = (target as HTMLInputElement).files;

    if (files === null) return;

    for (let index = 0; index < files.length; index++) {
      if (files[index].size && files[index].size < FILE_SIZE_LIMIT) emit('add', files[index]);
    }
  }
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
  text-overflow: ellipsis;
  font-size: 0.875rem;
}

.file {
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
