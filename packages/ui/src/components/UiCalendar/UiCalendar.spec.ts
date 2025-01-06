import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiCalendar from './UiCalendar.vue';

import { EVENTS } from './constants';
import { ICalendarEvent } from './interface';
import { wrapperFactory } from '@/test';

const calendar = dataTest('ui-calendar');

let wrapper: VueWrapper<InstanceType<typeof UiCalendar>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiCalendar, {
    events: EVENTS,
  });
});

enableAutoUnmount(afterEach);

describe('UiCalendar', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiCalendar)).toBeTruthy();
  });

  it('sets events to calendar', async () => {
    expect(
      wrapper.findComponent<DefineComponent<{ events: ICalendarEvent<unknown>[] }>>(calendar).vm.$props.events
    ).toStrictEqual(EVENTS);
  });
});
