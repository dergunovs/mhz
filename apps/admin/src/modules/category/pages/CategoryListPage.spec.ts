import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { ICategory } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import CategoryListPage from './CategoryListPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as categoryServices from '@/category/services';
import { CATEGORIES } from '@/category/fixtures';

const spyGetCategories = vi.spyOn(categoryServices, 'getCategories').mockReturnValue(mockQueryReply(CATEGORIES.data));

const categoryList = dataTest('category-list-page-list');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CategoryListPage, {});
});

enableAutoUnmount(afterEach);

describe('CategoryListPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CategoryListPage)).toBeTruthy();
  });

  it('gets categories and passes them to list props', async () => {
    expect(spyGetCategories).toBeCalledTimes(1);

    expect(
      wrapper.findComponent<DefineComponent<{ categories: ICategory[] }>>(categoryList).vm.$props.categories
    ).toEqual(CATEGORIES.data);
  });
});
