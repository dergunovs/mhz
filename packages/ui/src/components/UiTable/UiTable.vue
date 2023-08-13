<template>
  <div :class="$style.tableBlock" ref="tableBlock">
    <div v-if="isScrollable" :class="$style.scrollMessage">Table is scrollable →</div>

    <table :class="$style.table" cellpadding="8" cellspacing="0" :border="0" ref="table">
      <thead>
        <tr>
          <th
            v-for="(header, index) in props.headers"
            :key="`header-${header}-${index}`"
            :class="$style.th"
            :data-loading="props.isLoading"
          >
            {{ header }}
          </th>
        </tr>
      </thead>

      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface IProps {
  headers: string[];
  isLoading?: boolean;
}

const props = defineProps<IProps>();

const tableBlock = ref<HTMLElement>();
const table = ref<HTMLElement>();

const isScrollable = ref(false);

function checkTableSize(): void {
  if (tableBlock.value && table.value) {
    const tableBlockSize = Number(getComputedStyle(tableBlock.value).width.slice(0, -2));
    const tableSize = Number(getComputedStyle(table.value).width.slice(0, -2));

    isScrollable.value = tableSize > tableBlockSize;
  }
}

onMounted(() => {
  checkTableSize();
  window.addEventListener('resize', checkTableSize, true);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkTableSize, true);
});
</script>

<style module lang="scss">
.tableBlock {
  width: 100%;
  overflow-x: auto;
}

.scrollMessage {
  margin-bottom: 8px;
}

.table {
  width: 100%;
  border: 1px solid var(--color-gray);
  border-radius: 8px;

  td {
    padding: 6px 16px;
    vertical-align: top;
    border-top: 1px solid var(--color-gray);

    &[data-grow] {
      width: 100%;
    }

    &[data-no-wrap] {
      text-wrap: nowrap;
    }
  }
}

.th {
  padding: 12px 16px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-black);
  text-align: left;
  background-color: var(--color-gray-light-extra);

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }

  &[data-loading='true'] {
    color: var(--color-gray-light-extra);
  }
}
</style>
