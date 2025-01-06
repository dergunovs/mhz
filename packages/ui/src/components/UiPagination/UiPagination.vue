<template>
  <div :class="$style.pagination">
    <button
      @click="handleUpdate(1)"
      :disabled="page === 1"
      :class="$style.button"
      type="button"
      data-test="ui-pagination-first"
    >
      &lt;&lt;
    </button>

    <button
      @click="handleUpdate(props.page - 1)"
      :disabled="page === 1"
      :class="$style.button"
      type="button"
      data-test="ui-pagination-prev"
    >
      &lt;
    </button>

    <div :class="$style.text" data-test="ui-pagination">
      {{ page }} {{ props.lang === 'ru' ? 'из' : 'of' }} {{ total }}
    </div>

    <button
      @click="handleUpdate(props.page + 1)"
      :disabled="page === total"
      :class="$style.button"
      type="button"
      data-test="ui-pagination-next"
    >
      >
    </button>

    <button
      @click="handleUpdate(props.total)"
      :disabled="page === total"
      :class="$style.button"
      type="button"
      data-test="ui-pagination-last"
    >
      >>
    </button>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  page: number;
  total?: number;
  lang?: 'ru';
}

const props = defineProps<IProps>();
const emit = defineEmits<{ update: [value: number] }>();

function handleUpdate(value?: number) {
  if (!value) return;

  emit('update', value);
  document.querySelector('main')?.scrollTo(0, 0);
}
</script>

<style module lang="scss">
.pagination {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 0.875rem;
  cursor: pointer;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 16px;

  &:hover:not(:disabled) {
    border-color: var(--color-primary);
  }

  &:disabled {
    cursor: default;
    background-color: var(--color-gray-light-extra);
  }
}

.text {
  padding: 0 8px;
}
</style>
