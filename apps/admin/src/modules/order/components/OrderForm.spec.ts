import { ComputedRef, DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount, flushPromises } from '@vue/test-utils';
import { IBaseReply, API_ORDER, TOrderStatus } from 'mhz-contracts';
import { toast } from 'mhz-ui';
import * as helpers from 'mhz-helpers';

import OrderForm from './OrderForm.vue';

import { wrapperFactory, mockMutationReply, router } from '@/common/test';
import { ORDERS } from '@/order/fixtures';
import { URL_PRODUCT_EDIT } from '@/product/constants';
import { ORDER_CANCELLED, ORDER_COMPLETED, URL_ORDER } from '@/order/constants';
import * as orderServices from '@/order/services';
import { CURRENCY } from '@/common/constants';
import { URL_CUSTOMER } from '@/customer/constants';

const ORDER = ORDERS.data[0];

let onSuccessUpdate: () => void;
const spyMutateUpdate = vi.fn();

vi.spyOn(orderServices, 'updateOrder').mockImplementation(
  (id: ComputedRef<string | undefined>, options: { onSuccess?: () => void }) => {
    if (options.onSuccess) onSuccessUpdate = options.onSuccess;

    return mockMutationReply<IBaseReply, TOrderStatus>(spyMutateUpdate);
  }
);

let onSuccessDelete: () => void;
const spyMutateDelete = vi.fn();

vi.spyOn(orderServices, 'deleteOrder').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessDelete = options.onSuccess;

  return mockMutationReply<IBaseReply, string | undefined>(spyMutateDelete);
});

const spyRefetchQueries = vi.fn();
const spyRemoveQueries = vi.fn();

vi.spyOn(helpers, 'useQueryClient').mockReturnValue({
  refetchQueries: spyRefetchQueries,
  removeQueries: spyRemoveQueries,
} as unknown as helpers.QueryClient);

const spyRouterPush = vi.spyOn(router, 'push');
const spyRouterGo = vi.spyOn(router, 'go');
const spyToastSuccess = vi.spyOn(toast, 'success');

const QUERY_KEY = { queryKey: [API_ORDER] };

const orderFormCustomer = '[data-test="order-form-customer"]';
const orderFormStatus = '[data-test="order-form-status"]';
const orderFormProducts = '[data-test="order-form-products"]';
const orderFormProductsCount = '[data-test="order-form-products-count"]';
const orderFormProductsTitle = '[data-test="order-form-products-title"]';
const orderFormPrice = '[data-test="order-form-price"]';
const orderFormCreated = '[data-test="order-form-created"]';
const orderFormUpdated = '[data-test="order-form-updated"]';
const orderFormComplete = '[data-test="order-form-complete"]';
const orderFormBack = '[data-test="order-form-back"]';
const orderFormCancel = '[data-test="order-form-cancel"]';
const orderFormCancelConfirm = '[data-test="order-form-cancel-confirm"]';
const orderFormDelete = '[data-test="order-form-delete"]';
const orderFormDeleteConfirm = '[data-test="order-form-delete-confirm"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(OrderForm, {
    props: {
      order: ORDER,
    },
  });
});

enableAutoUnmount(afterEach);

describe('OrderForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(OrderForm)).toBeTruthy();
  });

  it('shows order content in fields if props is passed', async () => {
    expect(wrapper.find(orderFormCustomer).text()).toEqual(`${ORDER.customer.firstName} ${ORDER.customer.lastName}`);
    expect(wrapper.find(orderFormCustomer).attributes('to')).toEqual(`${URL_CUSTOMER}/${ORDER.customer._id}`);

    expect(wrapper.find(orderFormStatus).text()).toEqual(ORDER.status);
    expect(wrapper.findAll(orderFormProducts).length).toEqual(ORDER.products?.length);
    expect(wrapper.find(orderFormProductsCount).text()).toEqual(ORDER.products?.[0].count.toString());

    expect(wrapper.find(orderFormProductsTitle).text()).toEqual(ORDER.products?.[0].product.title);
    expect(wrapper.find(orderFormProductsTitle).attributes('to')).toEqual(
      `${URL_PRODUCT_EDIT}/${ORDER.products?.[0].product._id}`
    );

    expect(wrapper.find(orderFormPrice).text()).toEqual(`${ORDER.price} ${CURRENCY}`);
    expect(wrapper.find(orderFormCreated).text()).toEqual(helpers.formatDateTime(ORDER.dateCreated));
    expect(wrapper.find(orderFormUpdated).text()).toEqual(helpers.formatDateTime(ORDER.dateUpdated));
  });

  it('markes order as completed', async () => {
    expect(spyMutateUpdate).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);

    await wrapper.findComponent(orderFormComplete).trigger('click');

    expect(spyMutateUpdate).toBeCalledTimes(1);
    expect(spyMutateUpdate).toBeCalledWith(ORDER_COMPLETED);

    onSuccessUpdate();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);
  });

  it('goes back by back button click', async () => {
    expect(spyRouterGo).toBeCalledTimes(0);

    await wrapper.findComponent(orderFormBack).trigger('click');

    expect(spyRouterGo).toBeCalledTimes(1);
    expect(spyRouterGo).toBeCalledWith(-1);
  });

  it('cancels order', async () => {
    expect(spyMutateUpdate).toBeCalledTimes(0);
    expect(spyRemoveQueries).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    await wrapper.findComponent(orderFormCancel).trigger('click');

    wrapper.findComponent<DefineComponent>(orderFormCancelConfirm).vm.$emit('confirm');

    expect(spyMutateUpdate).toBeCalledTimes(1);
    expect(spyMutateUpdate).toBeCalledWith(ORDER_CANCELLED);

    onSuccessUpdate();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);
  });

  it('deletes order', async () => {
    expect(spyMutateDelete).toBeCalledTimes(0);
    expect(spyRemoveQueries).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    await wrapper.findComponent(orderFormDelete).trigger('click');

    wrapper.findComponent<DefineComponent>(orderFormDeleteConfirm).vm.$emit('confirm');

    expect(spyMutateDelete).toBeCalledTimes(1);
    expect(spyMutateDelete).toBeCalledWith(ORDER._id);

    onSuccessDelete();

    expect(spyRemoveQueries).toBeCalledTimes(1);
    expect(spyRemoveQueries).toBeCalledWith(QUERY_KEY);

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_ORDER);
  });
});
