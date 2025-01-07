import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiButton from './UiButton.vue';

import { DEFAULT_LAYOUT, DEFAULT_TYPE, DEFAULT_ICON, DEFAULT_SLOT } from './constants';

import IconTest from './icons/test.svg?component';

import { wrapperFactory } from '@/test';

const button = dataTest('ui-button');
const buttonIcon = dataTest('ui-button-icon');

let wrapper: VueWrapper<InstanceType<typeof UiButton>>;

beforeEach(() => {
  wrapper = wrapperFactory(
    UiButton,
    { layout: DEFAULT_LAYOUT, type: DEFAULT_TYPE, icon: DEFAULT_ICON },
    { default: DEFAULT_SLOT }
  );
});

enableAutoUnmount(afterEach);

describe('UiButton', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiButton)).toBeTruthy();
  });

  it('shows text by slot', async () => {
    expect(wrapper.find(button).text()).toBe(DEFAULT_SLOT);
  });

  it('sets layout by props', async () => {
    expect(wrapper.find(button).attributes('data-layout')).toBe(DEFAULT_LAYOUT);
  });

  it('sets type by props', async () => {
    expect(wrapper.find(button).attributes('type')).toBe(DEFAULT_TYPE);
  });

  it('shows icon by props', async () => {
    expect(wrapper.find(buttonIcon).exists()).toBe(false);

    await wrapper.setProps({ icon: IconTest });

    expect(wrapper.find(buttonIcon).exists()).toBe(true);
  });

  it('disables button by props', async () => {
    expect(wrapper.find(button).attributes('disabled')).toBe(undefined);

    await wrapper.setProps({ isDisabled: true });

    expect(wrapper.find(button).attributes('disabled')).toBe('');
  });
});
