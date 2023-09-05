<template>
  <div :class="$style.filters">
    <div>
      <div v-for="(value, key) in props.filters" :key="key">
        <div>
          <b>{{ key }}:</b>
        </div>
        <div>{{ value.fieldType }}</div>
        <div>{{ value.fieldUnits }}</div>
        <div>{{ value.values }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IFilterData } from 'mhz-types';

interface IProps {
  filters: IFilterData;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.filters {
  display: flex;
  flex-shrink: 0;
  width: 240px;
  padding: 16px;
  border: 1px solid var(--color-gray);
  border-radius: 16px;
}
</style>
