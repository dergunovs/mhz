import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { ICategoryField } from 'mhz-contracts';
import * as helpers from 'mhz-helpers';

import CategoryFieldForm from './CategoryFieldForm.vue';

import { wrapperFactory } from '@/common/test';
import { CATEGORY } from '@/category/fixtures';

const CATEGORY_FIELD = CATEGORY.data.fields?.[0];

const TEMP_ID = '123';

vi.spyOn(helpers, 'createTempId').mockReturnValue(TEMP_ID);

const NEW_CATEGORY_FIELD: ICategoryField = {
  _id: TEMP_ID,
  title: 'new title',
  fieldType: 'number',
  fieldValue: '',
  fieldUnits: 'pts',
};

const categoryFieldForm = '[data-test="category-field-form"]';
const categoryFieldFormTitle = '[data-test="category-field-form-title"]';
const categoryFieldFormType = '[data-test="category-field-form-type"]';
const categoryFieldFormUnits = '[data-test="category-field-form-units"]';
const categoryFieldFormCancel = '[data-test="category-field-form-cancel"]';
const categoryFieldFormDelete = '[data-test="category-field-form-delete"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CategoryFieldForm, {});
});

enableAutoUnmount(afterEach);

describe('CategoryFieldForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CategoryFieldForm)).toBeTruthy();
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

  it('adds new field', async () => {
    await wrapper.findComponent(categoryFieldFormTitle).setValue(NEW_CATEGORY_FIELD.title);
    await wrapper.findComponent(categoryFieldFormType).setValue(NEW_CATEGORY_FIELD.fieldType);
    await wrapper.findComponent(categoryFieldFormUnits).setValue(NEW_CATEGORY_FIELD.fieldUnits);

    await wrapper.findComponent(categoryFieldForm).trigger('submit');

    expect(wrapper.emitted()['add']).toHaveLength(1);
    expect(wrapper.emitted()['add'][0]).toEqual([NEW_CATEGORY_FIELD]);

    expect(wrapper.emitted()['hide']).toHaveLength(1);
  });

  it('cancels work with field', async () => {
    await wrapper.findComponent(categoryFieldFormCancel).trigger('click');

    expect(wrapper.emitted()['hide']).toHaveLength(1);
  });

  it('updated field', async () => {
    wrapper.unmount();

    const wrapperWithField = wrapperFactory(CategoryFieldForm, {
      props: {
        categoryField: CATEGORY_FIELD,
      },
    });

    await wrapperWithField.findComponent(categoryFieldFormTitle).setValue(NEW_CATEGORY_FIELD.title);

    await wrapperWithField.findComponent(categoryFieldForm).trigger('submit');

    expect(wrapperWithField.emitted()['update']).toHaveLength(1);
    expect(wrapperWithField.emitted()['update'][0]).toEqual([{ ...CATEGORY_FIELD, title: NEW_CATEGORY_FIELD.title }]);

    expect(wrapperWithField.emitted()['hide']).toHaveLength(1);
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

    expect(wrapperWithField.emitted()['hide']).toHaveLength(1);
  });
});
