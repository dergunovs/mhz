import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { ICategory } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import CategoryEditPage from './CategoryEditPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as categoryServices from '@/category/services';
import { CATEGORIES } from '@/category/fixtures';

const CATEGORY = CATEGORIES.data[0];

const spyGetCategory = vi.spyOn(categoryServices, 'getCategory').mockReturnValue(mockQueryReply(CATEGORY));

const categoryEditPageForm = dataTest('category-edit-page-form');

describe('CategoryEditPage', async () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = wrapperFactory(CategoryEditPage, {});
  });

  enableAutoUnmount(afterEach);

  it('exists', async () => {
    expect(wrapper.findComponent(CategoryEditPage)).toBeTruthy();
  });

  it('gets category and passes it to form props', async () => {
    expect(spyGetCategory).toHaveBeenCalledTimes(1);

    expect(
      wrapper.findComponent<DefineComponent<{ category: ICategory }>>(categoryEditPageForm).vm.$props.category
    ).toEqual(CATEGORY);
  });
});
