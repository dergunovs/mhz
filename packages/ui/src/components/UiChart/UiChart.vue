<template>
  <div :class="$style.chart">
    <div :class="$style.title">{{ props.title }}</div>

    <component :is="chartComponent" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Bar, Pie } from 'vue-chartjs';
import { Chart, Title, Tooltip, BarElement, CategoryScale, LinearScale, Colors, ArcElement } from 'chart.js';

interface IProps {
  labels: string[];
  data: number[];
  type: 'Bar' | 'Pie';
  title: string;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'Bar',
});

const chartComponent = computed(() => {
  if (props.type === 'Pie') return Pie;

  return Bar;
});

Chart.register(Title, Tooltip, BarElement, CategoryScale, LinearScale, Colors, ArcElement);

const chartData = {
  labels: props.labels,
  datasets: [{ data: props.data }],
};

const chartOptions = {
  responsive: true,
  aspectRatio: 2,
};
</script>

<style module lang="scss">
.chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.title {
  font-size: 1.5rem;
}
</style>
