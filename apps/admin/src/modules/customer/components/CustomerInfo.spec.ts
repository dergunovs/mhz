import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { formatDateTime } from 'mhz-helpers';

import CustomerInfo from './CustomerInfo.vue';

import { wrapperFactory } from '@/common/test';
import { CUSTOMERS } from '@/customer/fixtures';
import { URL_PRODUCT_EDIT } from '@/product/constants';

const CUSTOMER = CUSTOMERS.data[0];

const customerName = '[data-test="customer-info-name"]';
const customerEmail = '[data-test="customer-info-email"]';
const customerCreated = '[data-test="customer-info-created"]';
const customerLogin = '[data-test="customer-info-login"]';
const customerCart = '[data-test="customer-info-cart"]';
const customerCartItem = '[data-test="customer-info-cart-item"]';
const customerCartItemCount = '[data-test="customer-info-cart-item-count"]';
const customerCartItemTitle = '[data-test="customer-info-cart-item-title"]';
const customerFavourites = '[data-test="customer-info-favourites"]';
const customerFavouritesItem = '[data-test="customer-info-favourites-item"]';
const customerFavouritesTitle = '[data-test="customer-info-favourites-title"]';
const customerWatchedProducts = '[data-test="customer-info-watched-products"]';
const customerWatchedProductsItem = '[data-test="customer-info-watched-products-item"]';
const customerWatchedProductsDate = '[data-test="customer-info-watched-products-date"]';
const customerWatchedProductsTitle = '[data-test="customer-info-watched-products-title"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CustomerInfo, {
    props: {
      customer: CUSTOMER,
    },
  });
});

enableAutoUnmount(afterEach);

describe('CustomerInfo', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CustomerInfo)).toBeTruthy();
  });

  it('shows customer name', async () => {
    expect(wrapper.find(customerName).text()).toEqual(`${CUSTOMER.firstName} ${CUSTOMER.lastName}`);
  });

  it('shows customer email', async () => {
    expect(wrapper.find(customerEmail).text()).toEqual(CUSTOMER.email);
    expect(wrapper.find(customerEmail).attributes('href')).toEqual(`mailto:${CUSTOMER.email}`);
  });

  it('shows date created', async () => {
    expect(wrapper.find(customerCreated).text()).toEqual(formatDateTime(CUSTOMER.dateCreated));
  });

  it('shows date logged in', async () => {
    expect(wrapper.find(customerLogin).text()).toEqual(formatDateTime(CUSTOMER.dateLoggedIn));
  });

  it('shows cart', async () => {
    expect(wrapper.find(customerCart).exists()).toEqual(true);

    await wrapper.setProps({ customer: CUSTOMERS.data[1] });

    expect(wrapper.find(customerCart).exists()).toEqual(false);
  });

  it('shows cart items', async () => {
    expect(wrapper.find(customerCart).exists()).toEqual(true);
    expect(wrapper.findAll(customerCartItem).length).toEqual(CUSTOMER.cart?.length);

    await wrapper.setProps({ customer: CUSTOMERS.data[1] });

    expect(wrapper.find(customerCart).exists()).toEqual(false);
  });

  it('shows cart item info', async () => {
    expect(wrapper.find(customerCartItemCount).text()).toEqual(CUSTOMER.cart?.[0].count.toString());
    expect(wrapper.find(customerCartItemTitle).text()).toEqual(CUSTOMER.cart?.[0].product.title);

    expect(wrapper.find(customerCartItemTitle).attributes('to')).toEqual(
      `${URL_PRODUCT_EDIT}/${CUSTOMER.cart?.[0].product._id}`
    );
  });

  it('shows favourites', async () => {
    expect(wrapper.find(customerFavourites).exists()).toEqual(true);
    expect(wrapper.findAll(customerFavouritesItem).length).toEqual(CUSTOMER.favouriteProducts?.length);

    await wrapper.setProps({ customer: CUSTOMERS.data[1] });

    expect(wrapper.find(customerFavourites).exists()).toEqual(false);
  });

  it('shows favourites info', async () => {
    expect(wrapper.find(customerFavouritesTitle).text()).toEqual(CUSTOMER.favouriteProducts?.[0].title);

    expect(wrapper.find(customerFavouritesTitle).attributes('to')).toEqual(
      `${URL_PRODUCT_EDIT}/${CUSTOMER.favouriteProducts?.[0]._id}`
    );
  });

  it('shows watched products', async () => {
    expect(wrapper.find(customerWatchedProducts).exists()).toEqual(true);
    expect(wrapper.findAll(customerWatchedProductsItem).length).toEqual(CUSTOMER.watchedProducts?.length);

    await wrapper.setProps({ customer: CUSTOMERS.data[1] });

    expect(wrapper.find(customerWatchedProducts).exists()).toEqual(false);
  });

  it('shows watched products info', async () => {
    expect(wrapper.find(customerWatchedProductsTitle).text()).toEqual(CUSTOMER.watchedProducts?.[0].product.title);
    expect(wrapper.find(customerWatchedProductsTitle).attributes('to')).toEqual(
      `${URL_PRODUCT_EDIT}/${CUSTOMER.watchedProducts?.[0].product._id}`
    );

    expect(wrapper.find(customerWatchedProductsDate).text()).toEqual(
      formatDateTime(CUSTOMER.watchedProducts?.[0].dateCreated)
    );
  });
});
