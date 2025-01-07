import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IOrder } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import OrderListPage from './OrderListPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as orderServices from '@/order/services';
import { ORDERS } from '@/order/fixtures';

const spyGetOrders = vi.spyOn(orderServices, 'getOrders').mockReturnValue(mockQueryReply(ORDERS));

const orderList = dataTest('order-list-page-list');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(OrderListPage, {});
});

enableAutoUnmount(afterEach);

describe('OrderListPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(OrderListPage)).toBeTruthy();
  });

  it('gets orders and passes them to list props', async () => {
    expect(spyGetOrders).toBeCalledTimes(1);

    expect(wrapper.findComponent<DefineComponent<{ orders: IOrder[] }>>(orderList).vm.$props.orders).toEqual(
      ORDERS.data
    );
  });
});
