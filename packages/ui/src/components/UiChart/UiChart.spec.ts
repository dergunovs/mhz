import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import { LABELS, DATA, TITLE } from './constants';
import UiChart from './UiChart.vue';

import { wrapperFactory } from '@/test';

let wrapper: VueWrapper;

const chart = '[data-test="ui-chart"]';
const chartTitle = '[data-test="ui-chart-title"]';

beforeEach(() => {
  wrapper = wrapperFactory(UiChart, {
    props: {
      labels: LABELS,
      data: DATA,
      title: TITLE,
    },
  });
});

enableAutoUnmount(afterEach);

describe('UiChart', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiChart)).toBeTruthy();
  });

  it('shows title', async () => {
    expect(wrapper.find(chartTitle).text()).toBe(TITLE);
  });

  it('changes chart type by props', async () => {
    expect(wrapper.find(chart).attributes('data-type')).toBe('Bar');

    await wrapper.setProps({ type: 'Pie' });

    expect(wrapper.find(chart).attributes('data-type')).toBe('Pie');
  });
});
