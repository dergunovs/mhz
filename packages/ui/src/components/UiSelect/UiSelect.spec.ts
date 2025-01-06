import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiSelect from './UiSelect.vue';
import { MODEL_VALUE, OPTIONS, IS_FILTER, OPTIONS_OBJECTS } from './constants';

import { wrapperFactory } from '@/test';

const selectInput = dataTest('ui-select-input');
const selectInputFilter = dataTest('ui-select-input-filter');
const selectOptions = dataTest('ui-select-options');
const selectOption = dataTest('ui-select-option');
const selectNoResults = dataTest('ui-select-no-results');

let wrapper: VueWrapper<InstanceType<typeof UiSelect>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiSelect, { modelValue: MODEL_VALUE, options: OPTIONS, isFilter: IS_FILTER });
});

enableAutoUnmount(afterEach);

describe('UiSelect', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiSelect)).toBeTruthy();
  });

  it('toggles options on input click', async () => {
    const inputComponent = wrapper.findComponent(selectInput) as VueWrapper;

    expect(wrapper.find(selectOptions).exists()).toBe(false);

    await inputComponent.vm.$emit('toggle');

    expect(wrapper.find(selectOptions).exists()).toBe(true);

    await inputComponent.vm.$emit('toggle');

    expect(wrapper.find(selectOptions).exists()).toBe(false);
  });

  it('shows options', async () => {
    const inputComponent = wrapper.findComponent(selectInput) as VueWrapper;

    await inputComponent.vm.$emit('toggle');

    expect(wrapper.findAll(selectOption).length).toBe(OPTIONS.length);
    expect(wrapper.findAll(selectOption)[0].text()).toBe(OPTIONS[0]);
  });

  it('sets options', async () => {
    const inputComponent = wrapper.findComponent(selectInput) as VueWrapper;

    await inputComponent.vm.$emit('toggle');

    await wrapper.findAll(selectOption)[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([OPTIONS[0]]);
  });

  it('shows object options title', async () => {
    await wrapper.setProps({ options: OPTIONS_OBJECTS });

    const inputComponent = wrapper.findComponent(selectInput) as VueWrapper;

    await inputComponent.vm.$emit('toggle');

    expect(wrapper.findAll(selectOption)[0].text()).toBe(OPTIONS_OBJECTS[0].title);
  });

  it('sets object options', async () => {
    await wrapper.setProps({ options: OPTIONS_OBJECTS });

    const inputComponent = wrapper.findComponent(selectInput) as VueWrapper;

    await inputComponent.vm.$emit('toggle');

    await wrapper.findAll(selectOption)[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([OPTIONS_OBJECTS[0]]);
  });

  it('shows filter input in filter mode', async () => {
    await wrapper.setProps({ isFilter: true });

    const inputComponent = wrapper.findComponent(selectInput) as VueWrapper;

    expect(wrapper.find(selectInputFilter).exists()).toBe(false);

    await inputComponent.vm.$emit('toggle');

    expect(wrapper.find(selectInputFilter).exists()).toBe(true);
  });

  it('shows computed results in filter mode', async () => {
    await wrapper.setProps({ isFilter: true });

    const inputComponent = wrapper.findComponent(selectInput) as VueWrapper;

    await inputComponent.vm.$emit('toggle');

    const inputFilterComponent = wrapper.findComponent(selectInputFilter) as VueWrapper;

    expect(wrapper.findAll(selectOption).length).toBe(OPTIONS.length);

    await inputFilterComponent.vm.$emit('update:modelValue', OPTIONS[1]);

    expect(wrapper.findAll(selectOption).length).toBe(
      OPTIONS.filter((option) => option.toLowerCase().includes(OPTIONS[1].toLowerCase())).length
    );
  });

  it('shows no results in filter mode', async () => {
    await wrapper.setProps({ isFilter: true });

    const inputComponent = wrapper.findComponent(selectInput) as VueWrapper;

    await inputComponent.vm.$emit('toggle');

    const inputFilterComponent = wrapper.findComponent(selectInputFilter) as VueWrapper;

    expect(wrapper.find(selectNoResults).exists()).toBe(false);

    await inputFilterComponent.vm.$emit('update:modelValue', '100% not in options');

    expect(wrapper.findAll(selectOption).length).toBe(0);
    expect(wrapper.find(selectNoResults).exists()).toBe(true);

    await wrapper.find(selectNoResults).trigger('click');

    expect(wrapper.find(selectOptions).exists()).toBe(false);
  });
});
