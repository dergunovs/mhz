import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiRange from './UiRange.vue';
import { MIN, MAX, MODEL_VALUE } from './constants';

import { wrapperFactory } from '@/test';

const range = dataTest('ui-range');

let wrapper: VueWrapper<InstanceType<typeof UiRange>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiRange, { modelValue: MODEL_VALUE, min: MIN, max: MAX });
});

enableAutoUnmount(afterEach);

describe('UiRange', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiRange)).toBeTruthy();
  });

  it('passes props to range component', async () => {
    expect(wrapper.find(range).attributes('modelvalue')).toBe(MODEL_VALUE.join(','));
    expect(wrapper.find(range).attributes('min')).toBe(MIN.toString());
    expect(wrapper.find(range).attributes('max')).toBe(MAX.toString());
  });
});
