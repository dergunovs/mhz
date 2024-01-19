import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount, flushPromises } from '@vue/test-utils';
import { API_PRODUCT, IBaseReply, ICategoryField, IProduct } from 'mhz-contracts';
import * as helpers from 'mhz-helpers';
import { toast } from 'mhz-ui';

import ProductForm from './ProductForm.vue';

import { wrapperFactory, mockQueryReply, mockMutationReply, router } from '@/common/test';
import { URL_PRODUCT } from '@/product/constants';
import { PRODUCTS } from '@/product/fixtures';
import { CATEGORIES } from '@/category/fixtures';
import * as productServices from '@/product/services';
import * as manufacturerServies from '@/manufacturer/services';
import * as categoryServies from '@/category/services';
import { MANUFACTURERS } from '@/manufacturer/fixtures';

const spyGetManufacturers = vi.spyOn(manufacturerServies, 'getManufacturers').mockReturnValue(mockQueryReply(PRODUCTS));
const spyGetCategories = vi.spyOn(categoryServies, 'getCategories').mockReturnValue(mockQueryReply(CATEGORIES));

let onSuccessPost: () => void;
const spyMutatePost = vi.fn();

vi.spyOn(productServices, 'postProduct').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessPost = options.onSuccess;

  return mockMutationReply<IBaseReply, IProduct>(spyMutatePost);
});

let onSuccessUpdate: () => void;
const spyMutateUpdate = vi.fn();

vi.spyOn(productServices, 'updateProduct').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessUpdate = options.onSuccess;

  return mockMutationReply<IBaseReply, IProduct>(spyMutateUpdate);
});

let onSuccessDelete: () => void;
const spyMutateDelete = vi.fn();

vi.spyOn(productServices, 'deleteProduct').mockImplementation((options: { onSuccess?: () => void }) => {
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
const spyToastSuccess = vi.spyOn(toast, 'success');

const PRODUCT = PRODUCTS.data[0];
const QUERY_KEY = { queryKey: [API_PRODUCT] };

const productForm = '[data-test="product-form"]';
const productFormTitle = '[data-test="product-form-title"]';
const productFormPrice = '[data-test="product-form-price"]';
const productFormManufacturer = '[data-test="product-form-manufacturer"]';
const productFormCategory = '[data-test="product-form-category"]';
const productFormStock = '[data-test="product-form-stock"]';
const productFormDescription = '[data-test="product-form-description"]';
const productFormFields = '[data-test="product-form-fields"]';
const productFormImages = '[data-test="product-form-images"]';
const productFormButtons = '[data-test="product-form-buttons"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ProductForm, {
    props: {
      product: PRODUCT,
    },
  });
});

enableAutoUnmount(afterEach);

describe('ProductForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ProductForm)).toBeTruthy();
  });

  it('shows product content in fields if props is passed', async () => {
    expect(wrapper.findComponent(productFormTitle).attributes('modelvalue')).toEqual(PRODUCT.title);
    expect(wrapper.findComponent(productFormPrice).attributes('modelvalue')).toEqual(PRODUCT.price.toString());

    expect(wrapper.findComponent<DefineComponent>(productFormManufacturer).vm.$attrs.modelValue).toEqual(
      PRODUCT.manufacturer
    );

    expect(wrapper.findComponent<DefineComponent>(productFormCategory).vm.$attrs.modelValue).toEqual(PRODUCT.category);

    expect(wrapper.findComponent(productFormStock).attributes('modelvalue')).toEqual(PRODUCT.isInStock?.toString());
    expect(wrapper.findComponent(productFormDescription).attributes('modelvalue')).toEqual(PRODUCT.description);

    expect(
      wrapper.findComponent<DefineComponent<{ fields: ICategoryField[] }>>(productFormFields).vm.$props.fields
    ).toEqual(PRODUCT.fields);

    expect(wrapper.findComponent(productFormImages).attributes('urls')).toBe(PRODUCT.imageUrls?.join());
  });

  it('shows image preview if product has image', async () => {
    expect(wrapper.findComponent(productFormImages).exists()).toBe(true);

    await wrapper.setProps({ product: undefined });

    expect(wrapper.findComponent(productFormImages).exists()).toBe(true);
  });

  it('gets manufacturers and categories to fill the select options', async () => {
    expect(spyGetManufacturers).toBeCalledTimes(1);
    expect(spyGetCategories).toBeCalledTimes(1);
  });

  it('updates product', async () => {
    expect(spyMutateUpdate).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);

    const NEW_PRODUCT_TITLE = 'yo';

    await wrapper.findComponent(productFormTitle).setValue(NEW_PRODUCT_TITLE);

    await wrapper.find(productForm).trigger('submit');

    expect(spyMutateUpdate).toBeCalledTimes(1);
    expect(spyMutateUpdate).toBeCalledWith({ ...PRODUCT, title: NEW_PRODUCT_TITLE });

    onSuccessUpdate();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);
  });

  it('deletes product', async () => {
    expect(spyMutateDelete).toBeCalledTimes(0);
    expect(spyRemoveQueries).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    wrapper.findComponent<DefineComponent>(productFormButtons).vm.$emit('delete', PRODUCT._id);

    expect(spyMutateDelete).toBeCalledTimes(1);
    expect(spyMutateDelete).toBeCalledWith(PRODUCT._id);

    onSuccessDelete();

    expect(spyRemoveQueries).toBeCalledTimes(1);
    expect(spyRemoveQueries).toBeCalledWith(QUERY_KEY);

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_PRODUCT);
  });

  it('creates product', async () => {
    wrapper.unmount();

    expect(spyMutatePost).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    const wrapperWithoutProduct = wrapperFactory(ProductForm, {});

    const NEW_PRODUCT: IProduct = {
      title: 'text',
      price: 1000,
      thumbUrls: ['/thumb-1.jpg', '/thumb-2.jpg'],
      imageUrls: ['/1.jpg', '/2.jpg'],
      manufacturer: MANUFACTURERS.data[0],
      category: CATEGORIES.data[0],
      fields: [],
      description: 'text-2',
      isInStock: true,
    };

    await wrapperWithoutProduct.findComponent(productFormTitle).setValue(NEW_PRODUCT.title);
    await wrapperWithoutProduct.findComponent(productFormPrice).setValue(NEW_PRODUCT.price);
    await wrapperWithoutProduct.findComponent(productFormDescription).setValue(NEW_PRODUCT.description);
    await wrapperWithoutProduct.findComponent(productFormStock).setValue(NEW_PRODUCT.isInStock);

    wrapperWithoutProduct.vm.formData.imageUrls = NEW_PRODUCT.imageUrls;
    wrapperWithoutProduct.vm.formData.thumbUrls = NEW_PRODUCT.thumbUrls;
    wrapperWithoutProduct.vm.formData.manufacturer = NEW_PRODUCT.manufacturer;
    wrapperWithoutProduct.vm.formData.category = NEW_PRODUCT.category;

    await wrapperWithoutProduct.find(productForm).trigger('submit');

    expect(spyMutatePost).toBeCalledTimes(1);
    expect(spyMutatePost).toBeCalledWith(NEW_PRODUCT);

    onSuccessPost();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_PRODUCT);
  });
});
