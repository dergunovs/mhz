import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiField from './UiField.vue';
import { LABEL, ERROR, DEFAULT_SLOT } from './constants';

import { wrapperFactory } from '@/test';

const field = dataTest('ui-field');
const fieldLabel = dataTest('ui-field-label');
const fieldRequired = dataTest('ui-field-required');
const fieldError = dataTest('ui-field-error');

let wrapper: VueWrapper<InstanceType<typeof UiField>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiField, { label: LABEL }, { default: DEFAULT_SLOT });
});

enableAutoUnmount(afterEach);

describe('UiField', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiField)).toBeTruthy();
  });

  it('shows default slot content', async () => {
    expect(wrapper.find(field).text()).toBe(DEFAULT_SLOT);
  });

  it('shows field label', async () => {
    expect(wrapper.find(fieldLabel).text()).toBe(LABEL);
  });

  it('shows field required * symbol', async () => {
    expect(wrapper.find(fieldRequired).exists()).toBe(false);

    await wrapper.setProps({ isRequired: true });

    expect(wrapper.find(fieldRequired).text()).toBe('*');
  });

  it('shows error', async () => {
    expect(wrapper.find(fieldError).exists()).toBe(false);

    await wrapper.setProps({ error: ERROR });

    expect(wrapper.find(fieldError).text()).toBe(ERROR);
  });
});
