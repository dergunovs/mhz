import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import CategoryFieldList from './CategoryFieldList.vue';

import { wrapperFactory } from '@/common/test';
import { CATEGORY } from '@/category/fixtures';

const FIELDS = CATEGORY.data.fields;

const categoryField = dataTest('category-field-list-field');
const categoryFieldTitle = dataTest('category-field-list-field-title');
const categoryFieldType = dataTest('category-field-list-field-type');
const categoryFieldUnits = dataTest('category-field-list-field-units');
const categoryFieldEdit = dataTest('category-field-list-field-edit');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CategoryFieldList, {
    props: {
      fields: FIELDS,
      isShowCategoryFieldForm: true,
    },
  });
});

enableAutoUnmount(afterEach);

describe('CategoryFieldList', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CategoryFieldList)).toBeTruthy();
  });

  it('shows fields', async () => {
    expect(wrapper.findAll(categoryField).length).toEqual(FIELDS?.length);
  });

  it('shows field data', async () => {
    expect(wrapper.find(categoryFieldTitle).text()).toEqual(FIELDS?.[0].title);
    expect(wrapper.find(categoryFieldType).text()).toEqual(FIELDS?.[0].fieldType);
    expect(wrapper.find(categoryFieldUnits).text()).toEqual(FIELDS?.[0].fieldUnits);
  });

  it('disables field and button by isShowCategoryFieldForm props', async () => {
    expect(wrapper.find(categoryField).attributes('data-disabled')).toEqual('true');
    expect(wrapper.find(categoryFieldEdit).attributes('isdisabled')).toEqual('true');

    await wrapper.setProps({ isShowCategoryFieldForm: false });

    expect(wrapper.find(categoryField).attributes('data-disabled')).toEqual('false');
    expect(wrapper.find(categoryFieldEdit).attributes('isdisabled')).toEqual('false');
  });

  it('emits field data by edit button click', async () => {
    await wrapper.findComponent(categoryFieldEdit).trigger('click');

    expect(wrapper.emitted()['edit']).toHaveLength(1);
    expect(wrapper.emitted()['edit'][0]).toEqual([FIELDS?.[0]]);
  });
});
