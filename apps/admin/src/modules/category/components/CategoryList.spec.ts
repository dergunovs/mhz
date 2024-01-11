import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import CategoryList from './CategoryList.vue';

import { wrapperFactory } from '@/common/test';
import { URL_CATEGORY_EDIT } from '@/category/constants';
import { CATEGORIES } from '@/category/fixtures';

let wrapper: VueWrapper;

const categoryListRow = '[data-test="category-list-row"]';
const categoryListLink = '[data-test="category-list-link"]';

beforeEach(() => {
  wrapper = wrapperFactory(CategoryList, {
    props: {
      categories: CATEGORIES.data,
    },
  });
});

enableAutoUnmount(afterEach);

describe('CategoryList', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CategoryList)).toBeTruthy();
  });

  it('shows rows if categories props', async () => {
    expect(wrapper.findAll(categoryListRow).length).toEqual(CATEGORIES.data.length);

    await wrapper.setProps({ categories: [] });

    expect(wrapper.find(categoryListRow).exists()).toBe(false);
  });

  it('generated link to category', async () => {
    const LINK = `${URL_CATEGORY_EDIT}/${CATEGORIES.data[0]._id}`;

    expect(wrapper.find(categoryListLink).attributes('to')).toEqual(LINK);
  });

  it('shows category content in cells', async () => {
    expect(wrapper.find(categoryListLink).text()).toEqual(CATEGORIES.data[0].title);
  });
});
