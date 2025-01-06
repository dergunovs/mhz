import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import { DEFAULT_LABEL, DEFAULT_MODEL_VALUE } from './constants';
import UiCheckbox from './UiCheckbox.vue';

import { wrapperFactory } from '@/test';

const checkbox = dataTest('ui-checkbox');
const checkboxInput = dataTest('ui-checkbox-input');
const checkboxFake = dataTest('ui-checkbox-fake');
const checkboxLine = dataTest('ui-checkbox-line');
const checkboxError = dataTest('ui-checkbox-error');
const checkboxLabel = dataTest('ui-checkbox-label');
const checkboxLabelSub = dataTest('ui-checkbox-label-sub');
const checkboxLabelSwitcher = dataTest('ui-checkbox-label-switcher');
const checkboxRequired = dataTest('ui-checkbox-required');
const checkboxRequiredSwitcher = dataTest('ui-checkbox-required-switcher');

let wrapper: VueWrapper<InstanceType<typeof UiCheckbox>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiCheckbox, {
    modelValue: DEFAULT_MODEL_VALUE,
    label: DEFAULT_LABEL,
    labelSub: DEFAULT_LABEL,
    labelSwitcher: DEFAULT_LABEL,
  });
});

enableAutoUnmount(afterEach);

describe('UiCheckbox', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiCheckbox)).toBeTruthy();
  });

  it('emits data by checkbox update', async () => {
    expect(wrapper.find(checkboxInput).attributes('value')).toBe(DEFAULT_MODEL_VALUE.toString());

    await wrapper.find(checkboxInput).setValue(true);

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);

    const newInitialValue = 'Text data example, not boolean';

    await wrapper.setProps({ initialValue: newInitialValue });

    await wrapper.find(checkboxInput).setValue(false);

    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual([false]);

    await wrapper.find(checkboxInput).setValue(true);

    expect(wrapper.emitted('update:modelValue')).toHaveLength(3);
    expect(wrapper.emitted()['update:modelValue'][2]).toEqual([newInitialValue]);
    expect(wrapper.find(checkboxInput).attributes('value')).toBe(newInitialValue);
  });

  it('disables checkbox by props', async () => {
    expect(wrapper.find(checkbox).attributes('data-disabled')).toBe('false');
    expect(wrapper.find(checkboxInput).attributes('disabled')).toBe(undefined);
    expect(wrapper.find(checkboxFake).attributes('data-disabled')).toBe('false');

    await wrapper.setProps({ isDisabled: true });

    expect(wrapper.find(checkbox).attributes('data-disabled')).toBe('true');
    expect(wrapper.find(checkboxInput).attributes('disabled')).toBe('');
    expect(wrapper.find(checkboxFake).attributes('data-disabled')).toBe('true');
  });

  it('shows error from props', async () => {
    expect(wrapper.find(checkboxError).exists()).toBe(false);
    expect(wrapper.find(checkboxFake).attributes('data-error')).toBe('false');

    const newError = 'Error text';

    await wrapper.setProps({ error: newError });

    expect(wrapper.find(checkboxError).text()).toBe(newError);
    expect(wrapper.find(checkboxFake).attributes('data-error')).toBe('true');
  });

  it('shows label from props', async () => {
    expect(wrapper.find(checkboxLabel).exists()).toBe(false);
    expect(wrapper.find(checkboxLabelSub).exists()).toBe(false);
    expect(wrapper.find(checkboxLabelSwitcher).exists()).toBe(false);

    const newLabel = 'CPU';
    const newLabelSub = '(10 items)';
    const newLabelSwitcher = 'Mouse';

    await wrapper.setProps({ label: newLabel, labelSub: newLabelSub, labelSwitcher: newLabelSwitcher });

    expect(wrapper.find(checkboxLabel).text()).toBe(newLabel);
    expect(wrapper.find(checkboxLabelSub).text()).toBe(newLabelSub);
    expect(wrapper.find(checkboxLabelSwitcher).text()).toBe(newLabelSwitcher);
  });

  it('shows required symbol * from props', async () => {
    const newLabel = 'Label';

    await wrapper.setProps({ label: newLabel, labelSwitcher: newLabel });

    expect(wrapper.find(checkboxRequired).exists()).toBe(false);
    expect(wrapper.find(checkboxRequiredSwitcher).exists()).toBe(false);

    await wrapper.setProps({ isRequired: true });

    expect(wrapper.find(checkboxRequired).text()).toBe('*');
    expect(wrapper.find(checkboxRequiredSwitcher).text()).toBe('*');
  });

  it('transforms checkbox to switcher by props', async () => {
    expect(wrapper.find(checkboxFake).attributes('data-switcher')).toBe('false');
    expect(wrapper.findAll(checkboxLine).length).toBe(2);

    await wrapper.setProps({ isSwitcher: true });

    expect(wrapper.find(checkboxFake).attributes('data-switcher')).toBe('true');
    expect(wrapper.findAll(checkboxLine).length).toBe(0);
  });
});
