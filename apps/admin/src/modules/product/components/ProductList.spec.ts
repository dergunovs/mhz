import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import ProductList from './ProductList.vue';

import { wrapperFactory } from '@/common/test';
import { URL_PRODUCT_EDIT } from '@/product/constants';
import { PRODUCTS } from '@/product/fixtures';

const productListRow = dataTest('product-list-row');
const productListLink = dataTest('product-list-link');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ProductList, {
    props: {
      products: PRODUCTS.data,
    },
  });
});

enableAutoUnmount(afterEach);

describe('ProductList', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ProductList)).toBeTruthy();
  });

  it('shows rows if products props', async () => {
    expect(wrapper.findAll(productListRow).length).toEqual(PRODUCTS.data.length);

    await wrapper.setProps({ products: [] });

    expect(wrapper.find(productListRow).exists()).toBe(false);
  });

  it('generated link to product', async () => {
    const LINK = `${URL_PRODUCT_EDIT}/${PRODUCTS.data[0]._id}`;

    expect(wrapper.find(productListLink).attributes('to')).toEqual(LINK);
  });

  it('shows product content in cells', async () => {
    expect(wrapper.find(productListLink).text()).toEqual(PRODUCTS.data[0].title);
  });
});
