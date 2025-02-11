import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { ICustomer } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import CustomerPage from './CustomerPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as customerServices from '@/customer/services';
import { CUSTOMERS } from '@/customer/fixtures';

const CUSTOMER = CUSTOMERS.data[0];

const spyGetCustomer = vi.spyOn(customerServices, 'getCustomer').mockReturnValue(mockQueryReply(CUSTOMER));

const customerInfo = dataTest('customer-page-info');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CustomerPage, {});
});

enableAutoUnmount(afterEach);

describe('CustomerPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CustomerPage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('gets customer and passes him to info props', async () => {
    expect(spyGetCustomer).toBeCalledTimes(1);

    expect(wrapper.findComponent<DefineComponent<{ customer: ICustomer }>>(customerInfo).vm.$props.customer).toEqual(
      CUSTOMER
    );
  });
});
