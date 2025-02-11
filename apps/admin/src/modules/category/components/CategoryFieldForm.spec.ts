import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import * as helpers from 'mhz-helpers';
import { dataTest } from 'mhz-helpers';

import CategoryFieldForm from './CategoryFieldForm.vue';

import { wrapperFactory } from '@/common/test';
import { CATEGORY } from '@/category/fixtures';

const CATEGORY_FIELD = CATEGORY.data.fields?.[0];

const TEMP_ID = '123';

vi.spyOn(helpers, 'createTempId').mockReturnValue(TEMP_ID);

const categoryFieldFormType = dataTest('category-field-form-type');
const categoryFieldFormUnits = dataTest('category-field-form-units');
const categoryFieldFormCancel = dataTest('category-field-form-cancel');
const categoryFieldFormDelete = dataTest('category-field-form-delete');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CategoryFieldForm, {});
});

enableAutoUnmount(afterEach);

describe('CategoryFieldForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CategoryFieldForm)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows field units input if type is number', async () => {
    expect(wrapper.find(categoryFieldFormUnits).exists()).toEqual(false);

    await wrapper.findComponent(categoryFieldFormType).setValue('number');
    expect(wrapper.find(categoryFieldFormUnits).exists()).toEqual(true);

    await wrapper.findComponent(categoryFieldFormType).setValue('string');
    expect(wrapper.find(categoryFieldFormUnits).exists()).toEqual(false);

    await wrapper.findComponent(categoryFieldFormType).setValue('boolean');
    expect(wrapper.find(categoryFieldFormUnits).exists()).toEqual(false);
  });

  it('cancels work with field', async () => {
    await wrapper.findComponent(categoryFieldFormCancel).trigger('click');

    expect(wrapper.emitted()['hide']).toHaveLength(2);
  });

  it('removes field', async () => {
    wrapper.unmount();

    const wrapperWithField = wrapperFactory(CategoryFieldForm, {
      props: {
        categoryField: CATEGORY_FIELD,
      },
    });

    await wrapperWithField.findComponent(categoryFieldFormDelete).trigger('click');

    expect(wrapperWithField.emitted()['delete']).toHaveLength(1);
    expect(wrapperWithField.emitted()['delete'][0]).toEqual([CATEGORY_FIELD?._id]);

    expect(wrapperWithField.emitted()['hide']).toHaveLength(2);
  });
});
