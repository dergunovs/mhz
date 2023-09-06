<template>
  <div :class="$style.container">
    <div :class="$style.filters">
      <div v-for="(item, key) in props.filters" :key="key">
        <div :class="$style.title">
          {{ key }}<template v-if="item.fieldUnits">, {{ item.fieldUnits }}</template>
        </div>

        <div :class="$style.values">
          <UiCheckbox
            v-for="value in item.fieldValues"
            :key="value.value.toString()"
            :modelValue="
              choosenFilters?.some(
                (filter) => filter.title === key.toString() && filter.values.includes(value.value.toString())
              )
            "
            @update:modelValue="updateFilters(key.toString(), value.value.toString(), $event)"
            :label="`${value.value}`"
            :subLabel="` (${value.count})`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { IFilterData } from 'mhz-types';
import { UiCheckbox } from 'mhz-ui';

interface IProps {
  filters: IFilterData;
}

const props = defineProps<IProps>();

const choosenFilters = ref<{ title: string; values: string[] }[]>([]);

function updateFilters(title: string, value: string, isChecked: boolean) {
  const currentFilter = choosenFilters.value.find((filter) => filter.title === title);

  if (isChecked) {
    if (currentFilter) {
      currentFilter.values = [...currentFilter.values, value];
    } else {
      choosenFilters.value = [...choosenFilters.value, { title, values: [value] }];
    }
  } else if (currentFilter) {
    currentFilter.values = currentFilter.values.filter((currentValue) => currentValue !== value);
  }
}
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-shrink: 0;
  width: 240px;
  padding: 16px;
  border: 1px solid var(--color-gray);
  border-radius: 16px;
}

.filters {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
}

.title {
  margin-bottom: 8px;
  font-weight: 700;
  line-height: 1;
}

.values {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
