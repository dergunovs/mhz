import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import { LABELS, DATASETS, TITLE } from './constants';
import UiChart from './UiChart.vue';

import { wrapperFactory } from '@/test';

const chart = dataTest('ui-chart');
const chartTitle = dataTest('ui-chart-title');

let wrapper: VueWrapper<InstanceType<typeof UiChart>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiChart, {
    labels: LABELS,
    datasets: DATASETS,
    title: TITLE,
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
