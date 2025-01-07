import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import OrderList from './OrderList.vue';

import { wrapperFactory } from '@/common/test';
import { URL_ORDER } from '@/order/constants';
import { ORDERS } from '@/order/fixtures';

const orderListRow = dataTest('order-list-row');
const orderListLink = dataTest('order-list-link');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(OrderList, {
    props: {
      orders: ORDERS.data,
    },
  });
});

enableAutoUnmount(afterEach);

describe('OrderList', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(OrderList)).toBeTruthy();
  });

  it('shows rows if orders props', async () => {
    expect(wrapper.findAll(orderListRow).length).toEqual(ORDERS.data.length);

    await wrapper.setProps({ orders: [] });

    expect(wrapper.find(orderListRow).exists()).toBe(false);
  });

  it('generated link to order', async () => {
    const LINK = `${URL_ORDER}/${ORDERS.data[0]._id}`;

    expect(wrapper.find(orderListLink).attributes('to')).toEqual(LINK);
  });

  it('shows order content in cells', async () => {
    expect(wrapper.find(orderListLink).text()).toEqual(ORDERS.data[0]._id);
  });
});
