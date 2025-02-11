import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IProduct } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import ProductListPage from './ProductListPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as productServices from '@/product/services';
import { PRODUCTS } from '@/product/fixtures';

const spyGetProducts = vi.spyOn(productServices, 'getProducts').mockReturnValue(mockQueryReply(PRODUCTS));

const productList = dataTest('product-list-page-list');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ProductListPage, {});
});

enableAutoUnmount(afterEach);

describe('ProductListPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ProductListPage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('gets products and passes them to list props', async () => {
    expect(spyGetProducts).toBeCalledTimes(1);

    expect(wrapper.findComponent<DefineComponent<{ products: IProduct[] }>>(productList).vm.$props.products).toEqual(
      PRODUCTS.data
    );
  });
});
