import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import CustomerList from './CustomerList.vue';

import { wrapperFactory } from '@/common/test';
import { URL_CUSTOMER } from '@/customer/constants';
import { CUSTOMERS } from '@/customer/fixtures';

const customerListRow = dataTest('customer-list-row');
const customerListLink = dataTest('customer-list-link');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CustomerList, {
    props: {
      customers: CUSTOMERS.data,
    },
  });
});

enableAutoUnmount(afterEach);

describe('CustomerList', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(CustomerList)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows rows if customers props', async () => {
    expect(wrapper.findAll(customerListRow).length).toEqual(CUSTOMERS.data.length);

    await wrapper.setProps({ customers: [] });

    expect(wrapper.find(customerListRow).exists()).toBe(false);
  });

  it('generated link to customer', async () => {
    const LINK = `${URL_CUSTOMER}/${CUSTOMERS.data[0]._id}`;

    expect(wrapper.find(customerListLink).attributes('to')).toEqual(LINK);
  });

  it('shows customer content in cells', async () => {
    expect(wrapper.find(customerListLink).text()).toEqual(CUSTOMERS.data[0].email);
  });
});
