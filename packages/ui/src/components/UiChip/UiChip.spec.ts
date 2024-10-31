import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import UiChip from './UiChip.vue';

import { DEFAULT_TYPE, DEFAULT_SLOT } from './constants';

import { wrapperFactory } from '@/test';

const chip = '[data-test="ui-chip"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(UiChip, {
    props: { type: DEFAULT_TYPE },
    slots: { default: DEFAULT_SLOT },
  });
});

enableAutoUnmount(afterEach);

describe('UiChip', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiChip)).toBeTruthy();
  });

  it('shows text by slot', async () => {
    expect(wrapper.find(chip).text()).toBe(DEFAULT_SLOT);
  });

  it('sets type by props', async () => {
    expect(wrapper.find(chip).attributes('data-type')).toBe(DEFAULT_TYPE);
  });
});
