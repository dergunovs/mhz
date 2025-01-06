import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiFlex from './UiFlex.vue';

import { DEFAULT_ALIGN, DEFAULT_GAP, DEFAULT_JUSTIFY, DEFAULT_TAG, FIRST_SLOT } from './constants';

import { wrapperFactory } from '@/test';

const flex = dataTest('ui-flex');

let wrapper: VueWrapper<InstanceType<typeof UiFlex>>;

beforeEach(() => {
  wrapper = wrapperFactory(
    UiFlex,
    { tag: DEFAULT_TAG, align: DEFAULT_ALIGN, justify: DEFAULT_JUSTIFY, gap: DEFAULT_GAP },
    { default: FIRST_SLOT }
  );
});

enableAutoUnmount(afterEach);

describe('UiFlex', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiFlex)).toBeTruthy();
  });

  it('shows text by slot', async () => {
    expect(wrapper.find(flex).text()).toBe(FIRST_SLOT);
  });

  it('sets align by props', async () => {
    expect(wrapper.find(flex).attributes('data-align')).toBe(DEFAULT_ALIGN);
  });

  it('sets justify by props', async () => {
    expect(wrapper.find(flex).attributes('data-justify')).toBe(DEFAULT_JUSTIFY);
  });

  it('sets gap by props', async () => {
    expect(wrapper.find(flex).attributes('data-gap')).toBe(DEFAULT_GAP);
  });

  it('sets wrap by props', async () => {
    expect(wrapper.find(flex).attributes('data-wrap')).toBe('false');

    await wrapper.setProps({ wrap: true });

    expect(wrapper.find(flex).attributes('data-wrap')).toBe('true');
  });

  it('sets shrink by props', async () => {
    expect(wrapper.find(flex).attributes('data-shrink')).toBe('false');

    await wrapper.setProps({ shrink: true });

    expect(wrapper.find(flex).attributes('data-shrink')).toBe('true');
  });

  it('sets grow by props', async () => {
    expect(wrapper.find(flex).attributes('data-grow')).toBe('false');

    await wrapper.setProps({ grow: true });

    expect(wrapper.find(flex).attributes('data-grow')).toBe('true');
  });
});
