import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiSearch from './UiSearch.vue';
import {
  MODEL_VALUE,
  IS_SUCCESS,
  RESULTS,
  SEARCH_SCHEME,
  ENTER_MORE_SYMBOLS,
  LOADING,
  NO_RESULTS,
  DEBOUNCE_TIME,
} from './constants';

import { wrapperFactory } from '@/test';

const search = dataTest('ui-search');
const searchResults = dataTest('ui-search-results');
const searchResult = dataTest('ui-search-result');
const searchResultType = dataTest('ui-search-result-type');
const searchResultLink = dataTest('ui-search-result-link');
const searchResultLabel = dataTest('ui-search-result-label');

let wrapper: VueWrapper<InstanceType<typeof UiSearch>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiSearch, {
    modelValue: MODEL_VALUE,
    isSuccess: IS_SUCCESS,
    results: RESULTS,
    searchScheme: SEARCH_SCHEME,
  });
});

enableAutoUnmount(afterEach);

describe('UiSearch', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiSearch)).toBeTruthy();
  });

  it('shows results block by text enter to input', async () => {
    expect(wrapper.find(searchResults).exists()).toBe(false);

    await wrapper.setProps({ modelValue: '1' });
    await wrapper.find(search).trigger('click');

    expect(wrapper.find(searchResults).exists()).toBe(true);
  });

  it('hides results block by esc key', async () => {
    await wrapper.setProps({ modelValue: '1' });
    await wrapper.find(search).trigger('click');

    expect(wrapper.find(searchResults).exists()).toBe(true);

    await wrapper.find(search).trigger('keyup.esc');

    expect(wrapper.find(searchResults).exists()).toBe(false);
  });

  it('emits updated value in search input with debounce', async () => {
    await wrapper.setProps({ modelValue: '111' });
    await wrapper.find(search).trigger('click');

    const newValue = 'test';
    const inputComponent = wrapper.findComponent(search) as VueWrapper;

    await inputComponent.vm.$emit('update:modelValue', newValue);

    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');

    await new Promise((r) => {
      setTimeout(r, DEBOUNCE_TIME + 10);
    });

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([newValue]);
  });

  it('shows status messages by no results conditions', async () => {
    await wrapper.setProps({ modelValue: '1' });
    await wrapper.find(search).trigger('click');

    expect(wrapper.find(searchResults).text()).toBe(ENTER_MORE_SYMBOLS);

    await wrapper.setProps({ modelValue: '111', isSuccess: false });

    expect(wrapper.find(searchResults).text()).toBe(LOADING);

    await wrapper.setProps({ isSuccess: true, results: {} });

    expect(wrapper.find(searchResults).text()).toBe(NO_RESULTS);
  });

  it('shows results', async () => {
    await wrapper.setProps({ modelValue: '111' });
    await wrapper.find(search).trigger('click');

    expect(wrapper.findAll(searchResult).length).toBe(Object.keys(RESULTS).length);
    expect(wrapper.findAll(searchResultLink).length).toBe(Object.values(RESULTS).flat().length);
  });

  it('shows result type', async () => {
    await wrapper.setProps({ modelValue: '111' });
    await wrapper.find(search).trigger('click');

    expect(wrapper.findAll(searchResultType)[0].text()).toBe(`${Object.keys(RESULTS)[0]}:`);
  });

  it('generates result link', async () => {
    await wrapper.setProps({ modelValue: '111' });
    await wrapper.find(search).trigger('click');

    expect(wrapper.findAll(searchResultLink)[0].attributes('to')).toBe(
      `${SEARCH_SCHEME[0].url}/${Object.values(RESULTS)[0][0]._id}`
    );
  });

  it('shows result label', async () => {
    await wrapper.setProps({ modelValue: '111' });
    await wrapper.find(search).trigger('click');

    expect(wrapper.findAll(searchResultLabel)[0].text()).toBe(Object.values(RESULTS)[0][0].title);
  });

  it('clears search and hides results by click on link', async () => {
    await wrapper.setProps({ modelValue: '111' });
    await wrapper.find(search).trigger('click');

    expect(wrapper.find(searchResults).exists()).toBe(true);

    await wrapper.findAll(searchResultLink)[0].trigger('click');

    expect(wrapper.find(searchResults).exists()).toBe(false);
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
  });
});
