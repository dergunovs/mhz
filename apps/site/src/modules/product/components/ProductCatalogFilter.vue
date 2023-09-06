<template>
  <div :class="$style.container">
    <div :class="$style.filters">
      <div :class="[$style.filter, $style.price]">
        <div :class="$style.title">Price</div>

        <div :class="$style.range">
          <UiRange :min="props.filters.price[0]" :max="props.filters.price[1]" v-model="price" />
        </div>
      </div>

      <div v-for="(item, key) in props.filters.filters" :key="key" :class="$style.filter">
        <div v-if="route.name !== key">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { IFilterData } from 'mhz-types';
import { UiCheckbox, UiRange } from 'mhz-ui';

interface IProps {
  filters: IFilterData;
}

const props = defineProps<IProps>();

const price = ref<[number, number]>([props.filters.price[0], props.filters.price[1]]);

const choosenFilters = ref<{ title: string; values: string[] }[]>([]);

const route = useRoute();

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
  padding-right: 16px;
  border-right: 1px solid var(--color-gray);
}

.filters {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
}

.filter:empty {
  display: none;
}

.price {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 64px;
}

.range {
  padding: 0 12px;
}

.title {
  margin-bottom: 4px;
  font-weight: 700;
}

.values {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
