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
      @ready="(event: ICalendarUpdate) => emit('ready', event)"
      @viewChange="(event: ICalendarUpdate) => emit('update', event)"
      @eventClick="(event: ICalendarEvent<unknown>) => emit('eventClick', event)"
      data-test="ui-calendar"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import VueCal from 'vue-cal';

import 'vue-cal/dist/vuecal.css';
import { ICalendarEvent, ICalendarUpdate } from './interface';

interface IProps {
  height?: string;
  events?: ICalendarEvent<unknown>[];
}

const props = defineProps<IProps>();
const emit = defineEmits<{
  ready: [value: ICalendarUpdate];
  update: [value: ICalendarUpdate];
  eventClick: [value: ICalendarEvent<unknown>];
}>();

const heightComputed = computed(() => (props.height ? `${props.height}px` : '500px'));
</script>

<style module lang="scss">
.container {
  width: 100%;
  height: v-bind(heightComputed);
}

:global(.vuecal) {
  border-radius: 8px;
}

:global(.vuecal__body) {
  border-radius: 8px;
}

:global(.vuecal__cell-events) {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: center;
}

:global(.vuecal__event) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-color: var(--color-accent);
  border-radius: 50%;
}

:global(.vuecal--short-events .vuecal__event-title) {
  width: 100%;
  font-family: none;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
}

:global(.vuecal__title-bar) {
  min-height: 41px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-black);
  background-color: var(--color-gray-light-extra);
  border: 1px solid var(--color-gray);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

:global(.vuecal__arrow) {
  color: var(--color-black);
}

:global(.vuecal__title span:nth-child(2)) {
  display: none;
}

:global(.vuecal__cell--out-of-scope) {
  color: var(--color-gray-dark);
}

:global(.vuecal__cell--selected),
:global(.vuecal__cell--today) {
  background-color: var(--color-primary-light-extra);
}
</style>
