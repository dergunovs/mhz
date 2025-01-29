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
  Legend,
} from 'chart.js';

interface IDataset {
  data: number[];
  label?: string;
}

interface IProps {
  labels: string[];
  datasets: IDataset[];
  title?: string;
  type?: 'Bar' | 'Pie' | 'Line';
  isShowLegend?: boolean;
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

const isShowLegendComputed = computed(() => props.isShowLegend);
const tickAlign = computed(() => (props.type === 'Line' ? ('inner' as const) : ('center' as const)));

Chart.register(
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
  ArcElement,
  LineElement,
  PointElement,
  Legend
);

const chartData = {
  labels: [...props.labels],
  datasets: [...props.datasets],
};

const chartOptions = {
  responsive: true,
  aspectRatio: 5 / 3,
  ticks: { precision: 0 },
  scales: {
    x: { ticks: { maxRotation: 0, minRotation: 0, align: tickAlign.value } },
    y: { beginAtZero: true },
  },
  plugins: {
    legend: { display: isShowLegendComputed.value, position: 'bottom' as const, align: 'start' as const },
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
