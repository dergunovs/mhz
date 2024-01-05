<template>
  <div :class="$style.showFiltersButtons">
    <UiButton @click="toggleFilters" :icon="IconFilter" layout="plain">Show filters</UiButton>
  </div>

  <div :class="[$style.filters, isShowFilters && $style.filtersVisible]">
    <slot :hide="toggleFilters"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiButton } from 'mhz-ui';

import IconFilter from '@/layout/icons/filters.svg?component';

const isShowFilters = ref(false);

function toggleFilters() {
  isShowFilters.value = !isShowFilters.value;
}
</script>

<style module lang="scss">
.showFiltersButtons {
  display: none;
}

@media (max-width: $mobile) {
  .showFiltersButtons {
    display: block;
  }

  .filters {
    display: none;

    &.filtersVisible {
      position: absolute;
      inset: 0;
      z-index: 999;
      display: flex;
      width: 100%;
      height: 100vh;
      padding: 32px 16px 104px 16px;
      overflow-y: hidden;
      background: var(--color-white);
    }
  }
}
</style>
