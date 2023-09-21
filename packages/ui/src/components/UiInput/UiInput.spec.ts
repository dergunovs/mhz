import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import UiInput from './UiInput.vue';
import { MODEL_VALUE } from './constants';

import IconTest from './icons/copy.svg?component';

import { wrapperFactory } from '@/test';

const writeText = vi.fn();

Object.assign(navigator, {
  clipboard: { writeText },
});

let wrapper: VueWrapper;

const input = '[data-test="ui-input"]';
const inputBlock = '[data-test="ui-input-block"]';
const inputIcon = '[data-test="ui-input-icon"]';

beforeEach(() => {
  wrapper = wrapperFactory(UiInput, {
    props: { modelValue: MODEL_VALUE },
  });
});

enableAutoUnmount(afterEach);

describe('UiInput', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiInput)).toBeTruthy();
  });

  it('handles v-model behaviour', async () => {
    expect((wrapper.find(input).element as HTMLInputElement).value).toBe(MODEL_VALUE);

    const newValue = 'New value';

    await wrapper.find(input).setValue(newValue);

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([newValue]);
  });

  it('shows icon from props', async () => {
    expect(wrapper.find(inputIcon).exists()).toBe(false);
    expect(wrapper.find(input).attributes('data-append-icon')).toBe('false');

    await wrapper.setProps({ appendIcon: IconTest });

    expect(wrapper.find(inputIcon).exists()).toBe(true);
    expect(wrapper.find(input).attributes('data-append-icon')).toBe('true');
  });

  it('copies value by copy icon click', async () => {
    expect(wrapper.find(inputIcon).exists()).toBe(false);
    expect(wrapper.find(input).attributes('data-append-icon')).toBe('false');

    await wrapper.setProps({ isCopy: true });

    expect(wrapper.find(inputIcon).attributes('data-copy')).toBe('true');
    expect(wrapper.find(input).attributes('data-append-icon')).toBe('true');

    await wrapper.find(inputIcon).trigger('click');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(MODEL_VALUE);
  });

  it('can be part of UiSelect component in select mode', async () => {
    expect(wrapper.find(inputBlock).attributes('tabindex')).toBe('-1');
    expect(wrapper.find(input).attributes('tabindex')).toBe('0');

    await wrapper.setProps({ mode: 'select' });

    expect(wrapper.find(inputBlock).attributes('tabindex')).toBe('0');
    expect(wrapper.find(input).attributes('tabindex')).toBe('-1');

    await wrapper.find(inputBlock).trigger('click');

    expect(wrapper.emitted('toggle')).toHaveLength(1);
  });

  it('disables input by props', async () => {
    expect(wrapper.find(input).attributes('disabled')).toBe(undefined);

    await wrapper.setProps({ isDisabled: true });

    expect(wrapper.find(input).attributes('disabled')).toBe('');
  });
});
