<template>
  <EditorContent :editor="editor" :class="$style.editor" />
</template>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue';

import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

interface IProps {
  modelValue: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);

const content = computed(() => props.modelValue);

const editor = useEditor({
  content: content.value,
  extensions: [StarterKit],
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML());
  },
});

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value?.getHTML() === value;

    if (isSame) {
      return;
    }

    editor.value?.commands.setContent(value, false);
  }
);

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style module lang="scss">
.editor {
  width: 100%;
  min-height: 44px;
  padding: 8px 16px;
  font-size: 1rem;
  border: 1px solid var(--color-gray);
  border-radius: 16px;
  outline: none;

  &:focus-within {
    border: 1px solid var(--color-primary);
  }

  &:hover {
    cursor: text;

    &:not(&:focus-within) {
      border: 1px solid var(--color-gray-dark-extra);
    }
  }

  :global(.ProseMirror) {
    outline: none;
  }
}
</style>
