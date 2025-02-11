import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount, flushPromises } from '@vue/test-utils';
import { API_PRODUCT, IBaseReply, ICategoryField, IProduct } from 'mhz-contracts';
import * as helpers from 'mhz-helpers';
import { toast } from 'mhz-ui';
import { dataTest } from 'mhz-helpers';

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

const productForm = dataTest('product-form');
const productFormTitle = dataTest('product-form-title');
const productFormPrice = dataTest('product-form-price');
const productFormManufacturer = dataTest('product-form-manufacturer');
const productFormCategory = dataTest('product-form-category');
const productFormStock = dataTest('product-form-stock');
const productFormDescription = dataTest('product-form-description');
const productFormFields = dataTest('product-form-fields');
const productFormImages = dataTest('product-form-images');
const productFormButtons = dataTest('product-form-buttons');

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

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
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

  it('updates fields by child component emit', async () => {
    const NEW_FIELDS: ICategoryField[] = [];

    expect(
      wrapper.findComponent<DefineComponent<{ fields: ICategoryField[] }>>(productFormFields).vm.$props.fields
    ).toEqual(PRODUCT.fields);

    wrapper.findComponent<DefineComponent>(productFormFields).vm.$emit('update', NEW_FIELDS);

    expect((wrapper.vm as unknown as { formData: { fields: ICategoryField[] } }).formData.fields).toEqual(NEW_FIELDS);
  });

  it('updates child fields component by category updated', async () => {
    expect((wrapper.vm as unknown as { categoryUpdates: number }).categoryUpdates).toEqual(0);

    await wrapper.findComponent(productFormCategory).setValue([]);

    expect((wrapper.vm as unknown as { categoryUpdates: number }).categoryUpdates).toEqual(1);
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
