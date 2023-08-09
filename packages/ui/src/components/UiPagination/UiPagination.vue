<template>
  <div :class="$style.pagination">
    <button @click="emit('update', 1)" :disabled="page === 1" :class="$style.button" type="button">&lt;&lt;</button>
    <button @click="emit('update', props.page - 1)" :disabled="page === 1" :class="$style.button" type="button">
      &lt;
    </button>

    <div :class="$style.text">{{ page }} of {{ total }}</div>

    <button @click="emit('update', props.page + 1)" :disabled="page === total" :class="$style.button" type="button">
      >
    </button>
    <button @click="emit('update', props.total)" :disabled="page === total" :class="$style.button" type="button">
      >>
    </button>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  page: number;
  total?: number;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update']);
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
  width: 44px;
  height: 44px;
  font-size: 0.875rem;
  cursor: pointer;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 16px;

  &:hover:not(:disabled) {
    background-color: var(--color-gray-light);
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
