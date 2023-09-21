import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import UiField from './UiField.vue';
import { LABEL, ERROR, DEFAULT_SLOT } from './constants';

import { wrapperFactory } from '@/test';

let wrapper: VueWrapper;

const field = '[data-test="ui-field"]';
const fieldLabel = '[data-test="ui-field-label"]';
const fieldRequired = '[data-test="ui-field-required"]';
const fieldError = '[data-test="ui-field-error"]';

beforeEach(() => {
  wrapper = wrapperFactory(UiField, {
    props: { label: LABEL },
    slots: { default: DEFAULT_SLOT },
  });
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
