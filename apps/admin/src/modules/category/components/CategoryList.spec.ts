import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import CategoryList from './CategoryList.vue';

import { wrapperFactory } from '@/common/test';
import { URL_CATEGORY_EDIT } from '@/category/constants';
import { CATEGORIES } from '@/category/fixtures';

const categoryListRow = dataTest('category-list-row');
const categoryListLink = dataTest('category-list-link');

let wrapper: VueWrapper;

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

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
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
