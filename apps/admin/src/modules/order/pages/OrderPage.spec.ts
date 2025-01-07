import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IOrder } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import OrderPage from './OrderPage.vue';

import { wrapperFactory, mockQueryReply } from '@/common/test';
import { ORDERS } from '@/order/fixtures';
import * as orderServices from '@/order/services';

const ORDER = ORDERS.data[0];

const spyGetOrder = vi.spyOn(orderServices, 'getOrder').mockReturnValue(mockQueryReply(ORDER));

const orderPageForm = dataTest('order-page-form');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(OrderPage, {});
});

enableAutoUnmount(afterEach);

describe('OrderPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(OrderPage)).toBeTruthy();
  });

  it('gets order and passes it to form props', async () => {
    expect(spyGetOrder).toBeCalledTimes(1);

    expect(wrapper.findComponent<DefineComponent<{ order: IOrder }>>(orderPageForm).vm.$props.order).toEqual(ORDER);
  });
});
