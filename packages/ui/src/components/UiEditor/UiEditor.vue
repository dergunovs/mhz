<template>
  <div :class="$style.container">
    <div :class="$style.actions">
      <button
        v-for="action in actions"
        :key="action._id"
        @click="action.method()"
        :class="$style.action"
        type="button"
        data-test="ui-editor-button"
      >
        {{ action.name }}
      </button>
    </div>

    <EditorContent :editor="editor" :class="$style.editor" data-test="ui-editor" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue';

import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

interface IProps {
  modelValue?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits<{ 'update:modelValue': [value?: string] }>();

const content = computed(() => props.modelValue);

const editor = useEditor({
  content: content.value,
  extensions: [StarterKit],
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML());
  },
});

const actions = [
  { _id: 1, name: 'b', method: () => editor.value?.chain().focus().toggleBold().run() },
  { _id: 2, name: 'i', method: () => editor.value?.chain().focus().toggleItalic().run() },
  { _id: 3, name: 'h2', method: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run() },
  { _id: 4, name: 'h3', method: () => editor.value?.chain().focus().toggleHeading({ level: 3 }).run() },
];

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value?.getHTML() === value;

    if (isSame) {
      return;
    }

    editor.value?.commands.setContent(value || '', false);
  }
);

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--color-gray);
  border-radius: 16px;

  &:focus-within {
    border: 1px solid var(--color-primary);
  }

  &:hover {
    cursor: text;

    &:not(:focus-within) {
      border: 1px solid var(--color-gray-dark-extra);
    }
  }
}

.actions {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-bottom: 1px solid var(--color-gray);
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  padding: 8px;
  font-weight: 700;
  cursor: pointer;
  background-color: var(--color-transparent);
  border: none;
  border-radius: 8px;

  &:hover {
    background-color: var(--color-primary-light);
  }
}

.editor {
  padding: 8px 16px;
  font-size: 1rem;
  outline: none;

  :global(.ProseMirror) {
    outline: none;
  }
}
</style>
