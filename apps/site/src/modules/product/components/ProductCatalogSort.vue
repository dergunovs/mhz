<template>
  <div>
    <div :class="$style.select">
      <div>Sort:</div>
      <UiSelect :modelValue="sort" @update:modelValue="updateSort" :options="SORT_OPTIONS" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { UiSelect } from 'mhz-ui';
import { ISortOption } from 'mhz-helpers';

import { SORT_OPTIONS } from '@/product/constants';

interface IProps {
  modelValue: ISortOption;
  page: number;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue', 'reset']);

const sort = computed(() =>
  SORT_OPTIONS.find((option) => option.value === props.modelValue.value && option.isAsc === props.modelValue.isAsc)
);

function updateSort(value: { value: string; isAsc: boolean }) {
  if (props.page > 1) {
    emit('reset', { value: value.value, isAsc: value.isAsc });
  } else {
    emit('update:modelValue', { value: value.value, isAsc: value.isAsc });
  }
}
</script>

<style module lang="scss">
.select {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
