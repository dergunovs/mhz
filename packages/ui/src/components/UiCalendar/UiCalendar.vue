<template>
  <div :class="$style.container">
    <VueCal
      hideViewSelector
      eventsOnMonthView="short"
      :time="false"
      activeView="month"
      :disableViews="['years', 'year', 'day', 'week']"
      locale="ru"
      :transitions="false"
      :events="props.events"
      :onEventClick="props.onEventClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import VueCal from 'vue-cal';

import 'vue-cal/dist/vuecal.css';

interface ICalendarEvent<T> {
  start: Date;
  end: Date;
  title: string;
  content: T[];
}

interface IProps {
  height?: string;
  events: ICalendarEvent<unknown>[];
  onEventClick: (event: ICalendarEvent<never>) => void;
}

const props = defineProps<IProps>();

const heightComputed = computed(() => (props.height ? `${props.height}px` : '500px'));
</script>

<style module lang="scss">
.container {
  height: v-bind(heightComputed);
}

:global(.vuecal__cell-events) {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: center;
}

:global(.vuecal__event) {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: var(--color-accent);
  border-radius: 50%;
}

:global(.vuecal--short-events .vuecal__event-title) {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-white);
  text-align: center;
}
</style>
