<template>
  <div :class="$style.chart">
    <div v-if="props.title" :class="$style.title" data-test="ui-chart-title">{{ props.title }}</div>

    <component
      :is="chartComponent"
      :options="chartOptions"
      :data="chartData"
      :data-type="props.type"
      data-test="ui-chart"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Bar, Pie, Line } from 'vue-chartjs';
import {
  Chart,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';

interface IProps {
  labels: string[];
  data: number[];
  title?: string;
  type?: 'Bar' | 'Pie' | 'Line';
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'Bar',
  title: '',
});

const chartComponent = computed(() => {
  if (props.type === 'Pie') return Pie;
  if (props.type === 'Line') return Line;

  return Bar;
});

Chart.register(Title, Tooltip, BarElement, CategoryScale, LinearScale, Colors, ArcElement, LineElement, PointElement);

const chartData = {
  labels: props.labels,
  datasets: [{ data: props.data }],
};

const chartOptions = {
  responsive: true,
  aspectRatio: 2,
  ticks: { precision: 0 },
  scales: {
    x: { ticks: { maxRotation: 0, minRotation: 0 } },
    y: { beginAtZero: true },
  },
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
