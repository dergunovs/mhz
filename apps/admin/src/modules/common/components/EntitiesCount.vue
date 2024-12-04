<template>
  <div v-if="count" :class="$style.stats">
    <div :class="$style.top">
      <UiChart
        title="Base stats"
        :labels="count.base.labels"
        :datasets="count.base.datasets"
        data-test="entities-count-base"
      />

      <UiChart
        title="Products by categories"
        type="Pie"
        :labels="count.categories.labels"
        :datasets="count.categories.datasets"
        isShowLegend
        data-test="entities-count-product-categories"
      />
    </div>

    <UiChart
      title="Products by manufacturers"
      :labels="count.manufacturers.labels"
      :datasets="count.manufacturers.datasets"
      data-test="entities-count-product-manufacturers"
    />
  </div>
</template>

<script setup lang="ts">
import { UiChart } from 'mhz-ui';

import { getEntitiesCount } from '@/common/services';

const { data: count } = getEntitiesCount();
</script>

<style module lang="scss">
.stats {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.top {
  display: flex;
  gap: 64px;
}
</style>
