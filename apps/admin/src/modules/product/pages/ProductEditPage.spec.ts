import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IProduct } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import ProductEditPage from './ProductEditPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as productServices from '@/product/services';
import { PRODUCTS } from '@/product/fixtures';

const PRODUCT = PRODUCTS.data[0];

const spyGetProduct = vi.spyOn(productServices, 'getProduct').mockReturnValue(mockQueryReply(PRODUCT));

const productEditPageForm = dataTest('product-edit-page-form');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ProductEditPage, {});
});

enableAutoUnmount(afterEach);

describe('ProductEditPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ProductEditPage)).toBeTruthy();
  });

  it('gets product and passes it to form props', async () => {
    expect(spyGetProduct).toBeCalledTimes(1);

    expect(
      wrapper.findComponent<DefineComponent<{ product: IProduct }>>(productEditPageForm).vm.$props.product
    ).toEqual(PRODUCT);
  });
});
