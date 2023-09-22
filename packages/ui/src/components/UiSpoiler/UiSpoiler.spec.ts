import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import UiSpoiler from './UiSpoiler.vue';
import { TITLE, MODEL_VALUE } from './constants';

import { wrapperFactory } from '@/test';

let wrapper: VueWrapper;

const spoiler = '[data-test="ui-spoiler"]';
const spoilerButton = '[data-test="ui-spoiler-button"]';
const spoilerButtonTitle = '[data-test="ui-spoiler-button-title"]';

beforeEach(() => {
  wrapper = wrapperFactory(UiSpoiler, {
    props: { title: TITLE, modelValue: MODEL_VALUE },
  });
});

enableAutoUnmount(afterEach);

describe('UiSpoiler', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiSpoiler)).toBeTruthy();
  });

  it('shows title', async () => {
    expect(wrapper.find(spoilerButtonTitle).text()).toBe(TITLE);
  });

  it('shows spoiler content by v-model', async () => {
    expect(wrapper.find(spoiler).isVisible()).toBe(false);

    await wrapper.setProps({ modelValue: true });

    expect(wrapper.find(spoiler).isVisible()).toBe(true);
  });

  it('updates v-model by spoiler button click', async () => {
    await wrapper.find(spoilerButton).trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([!MODEL_VALUE]);
  });
});
