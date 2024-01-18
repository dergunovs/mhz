import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import UiModal from './UiModal.vue';
import { MODEL_VALUE, IS_CONFIRM, DEFAULT_SLOT } from './constants';

import { wrapperFactory } from '@/test';

const modal = '[data-test="ui-modal"]';
const modalContainer = '[data-test="ui-modal-container"]';
const modalClose = '[data-test="ui-modal-close"]';
const modalSlot = '[data-test="ui-modal-slot"]';
const modalConfirm = '[data-test="ui-modal-confirm"]';
const modalCancel = '[data-test="ui-modal-cancel"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(UiModal, {
    props: { modelValue: MODEL_VALUE, isConfirm: IS_CONFIRM },
    slots: { default: DEFAULT_SLOT },
  });
});

enableAutoUnmount(afterEach);

describe('UiModal', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiModal)).toBeTruthy();
  });

  it('shows modal by modelValue props', async () => {
    expect(wrapper.find(modalContainer).exists()).toBe(false);
    expect(wrapper.find(modal).exists()).toBe(false);

    await wrapper.setProps({ modelValue: true });

    expect(wrapper.find(modalContainer).exists()).toBe(true);
    expect(wrapper.find(modal).exists()).toBe(true);
  });

  it('hides modal by close button click', async () => {
    await wrapper.setProps({ modelValue: true });

    expect(wrapper.find(modal).exists()).toBe(true);

    await wrapper.find(modalClose).trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  it('hides modal by container background click except modal background click', async () => {
    await wrapper.setProps({ modelValue: true });

    expect(wrapper.find(modal).exists()).toBe(true);

    await wrapper.find(modal).trigger('mousedown');
    await wrapper.find(modalSlot).trigger('mousedown');

    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');

    await wrapper.find(modalContainer).trigger('mousedown');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  it('shows slot content', async () => {
    expect(wrapper.find(modalSlot).exists()).toBe(false);

    await wrapper.setProps({ modelValue: true });

    expect(wrapper.find(modalSlot).text()).toBe(DEFAULT_SLOT);
  });

  it('shows confirm and cancel buttons in confirm mode', async () => {
    await wrapper.setProps({ modelValue: true });

    expect(wrapper.find(modalConfirm).exists()).toBe(false);
    expect(wrapper.find(modalCancel).exists()).toBe(false);

    await wrapper.setProps({ isConfirm: true });

    expect(wrapper.find(modalConfirm).exists()).toBe(true);
    expect(wrapper.find(modalCancel).exists()).toBe(true);
  });

  it('hides by cancel button click in confirm mode', async () => {
    await wrapper.setProps({ modelValue: true, isConfirm: true });

    await wrapper.find(modalCancel).trigger('click');

    expect(wrapper.emitted()).not.toHaveProperty('confirm');
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  it('emit confirm and hides by confirm button click in confirm mode', async () => {
    await wrapper.setProps({ modelValue: true, isConfirm: true });

    await wrapper.find(modalConfirm).trigger('click');

    expect(wrapper.emitted('confirm')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });
});
