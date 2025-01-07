import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { ICustomer } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import CustomerListPage from './CustomerListPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as customerServices from '@/customer/services';
import { CUSTOMERS } from '@/customer/fixtures';

const spyGetCustomers = vi.spyOn(customerServices, 'getCustomers').mockReturnValue(mockQueryReply(CUSTOMERS));

const customerList = dataTest('customer-list-page-list');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CustomerListPage, {});
});

enableAutoUnmount(afterEach);

describe('CustomerListPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CustomerListPage)).toBeTruthy();
  });

  it('gets customers and passes them to list props', async () => {
    expect(spyGetCustomers).toBeCalledTimes(1);

    expect(
      wrapper.findComponent<DefineComponent<{ customers: ICustomer[] }>>(customerList).vm.$props.customers
    ).toEqual(CUSTOMERS.data);
  });
});
