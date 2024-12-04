import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import { LABELS, DATASETS, TITLE } from './constants';
import UiChart from './UiChart.vue';

import { wrapperFactory } from '@/test';

const chart = '[data-test="ui-chart"]';
const chartTitle = '[data-test="ui-chart-title"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(UiChart, {
    props: {
      labels: LABELS,
      datasets: DATASETS,
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
