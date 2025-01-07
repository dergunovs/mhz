import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount, flushPromises } from '@vue/test-utils';
import { ICategory, ICategoryField, IBaseReply, API_CATEGORY } from 'mhz-contracts';
import { toast } from 'mhz-ui';
import * as helpers from 'mhz-helpers';
import { dataTest } from 'mhz-helpers';

import CategoryForm from './CategoryForm.vue';

import { wrapperFactory, mockMutationReply, router } from '@/common/test';
import { CATEGORY } from '@/category/fixtures';
import { URL_CATEGORY } from '@/category/constants';
import * as categoryServices from '@/category/services';

let onSuccessPost: () => void;
const spyMutatePost = vi.fn();

vi.spyOn(categoryServices, 'postCategory').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessPost = options.onSuccess;

  return mockMutationReply<IBaseReply, ICategory>(spyMutatePost);
});

let onSuccessUpdate: () => void;
const spyMutateUpdate = vi.fn();

vi.spyOn(categoryServices, 'updateCategory').mockImplementation((options: { onSuccess?: () => void }) => {
  if (options.onSuccess) onSuccessUpdate = options.onSuccess;

  return mockMutationReply<IBaseReply, ICategory>(spyMutateUpdate);
});

let onSuccessDelete: () => void;
const spyMutateDelete = vi.fn();

vi.spyOn(categoryServices, 'deleteCategory').mockImplementation((options: { onSuccess?: () => void }) => {
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

const QUERY_KEY = { queryKey: [API_CATEGORY] };

const categoryForm = dataTest('category-form');
const categoryFormTitle = dataTest('category-form-title');
const categoryFormDescription = dataTest('category-form-description');
const categoryFormFieldList = dataTest('category-form-field-list');
const categoryFormAddCategory = dataTest('category-form-add-category');
const categoryFormFieldForm = dataTest('category-form-field-form');
const categoryFormIcon = dataTest('category-form-icon');
const categoryFormButtons = dataTest('category-form-buttons');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(CategoryForm, {
    props: {
      category: CATEGORY.data,
    },
  });
});

enableAutoUnmount(afterEach);

describe('CategoryForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(categoryForm)).toBeTruthy();
  });

  it('shows category content in fields if props is passed', async () => {
    expect(wrapper.findComponent(categoryFormTitle).attributes('modelvalue')).toBe(CATEGORY.data.title);
    expect(wrapper.findComponent(categoryFormDescription).attributes('modelvalue')).toBe(CATEGORY.data.description);
    expect(wrapper.findComponent(categoryFormIcon).attributes('urls')).toBe(CATEGORY.data.iconUrl);

    expect(
      wrapper.findComponent<DefineComponent<{ fields: ICategoryField[] }>>(categoryFormFieldList).vm.$props.fields
    ).toEqual(CATEGORY.data.fields);
  });

  it('shows icon preview if category has fields', async () => {
    expect(wrapper.findComponent(categoryFormIcon).exists()).toBe(true);

    await wrapper.setProps({ category: undefined });

    expect(wrapper.findComponent(categoryFormIcon).exists()).toBe(true);
  });

  it('shows field list if category has fields', async () => {
    expect(wrapper.findComponent(categoryFormFieldList).exists()).toBe(true);

    await wrapper.setProps({ category: undefined });

    expect(wrapper.findComponent(categoryFormFieldList).exists()).toBe(true);
  });

  it('shows field form by edit form emit', async () => {
    const FIELD_TO_EDIT = CATEGORY.data.fields?.[0];

    expect(wrapper.findComponent(categoryFormFieldForm).exists()).toBe(false);

    await wrapper.findComponent<DefineComponent>(categoryFormFieldList).vm.$emit('edit', FIELD_TO_EDIT);

    expect(wrapper.findComponent(categoryFormFieldForm).exists()).toBe(true);

    expect(
      wrapper.findComponent<DefineComponent<{ categoryField: ICategoryField }>>(categoryFormFieldForm).vm.$props
        .categoryField
    ).toEqual(FIELD_TO_EDIT);
  });

  it('shows field form by add category field button click', async () => {
    expect(wrapper.findComponent(categoryFormFieldForm).exists()).toBe(false);

    await wrapper.findComponent(categoryFormAddCategory).trigger('click');

    expect(wrapper.findComponent(categoryFormFieldForm).exists()).toBe(true);
    expect(wrapper.findComponent(categoryFormAddCategory).exists()).toBe(false);
  });

  it('hides field form by hide emit', async () => {
    await wrapper.findComponent(categoryFormAddCategory).trigger('click');

    expect(wrapper.findComponent(categoryFormFieldForm).exists()).toBe(true);

    await wrapper.findComponent<DefineComponent>(categoryFormFieldForm).vm.$emit('hide');

    expect(wrapper.findComponent(categoryFormFieldForm).exists()).toBe(false);
  });

  it('updates category', async () => {
    expect(spyMutateUpdate).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);

    const NEW_CATEGORY_TITLE = 'yo';

    await wrapper.findComponent(categoryFormTitle).setValue(NEW_CATEGORY_TITLE);

    await wrapper.find(categoryForm).trigger('submit');

    expect(spyMutateUpdate).toBeCalledTimes(1);
    expect(spyMutateUpdate).toBeCalledWith({ ...CATEGORY.data, title: NEW_CATEGORY_TITLE });

    onSuccessUpdate();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);
  });

  it('deletes banner', async () => {
    expect(spyMutateDelete).toBeCalledTimes(0);
    expect(spyRemoveQueries).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    wrapper.findComponent<DefineComponent>(categoryFormButtons).vm.$emit('delete', CATEGORY.data._id);

    expect(spyMutateDelete).toBeCalledTimes(1);
    expect(spyMutateDelete).toBeCalledWith(CATEGORY.data._id);

    onSuccessDelete();

    expect(spyRemoveQueries).toBeCalledTimes(1);
    expect(spyRemoveQueries).toBeCalledWith(QUERY_KEY);

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_CATEGORY);
  });

  it('creates category', async () => {
    wrapper.unmount();

    expect(spyMutatePost).toBeCalledTimes(0);
    expect(spyRefetchQueries).toBeCalledTimes(0);
    expect(spyToastSuccess).toBeCalledTimes(0);
    expect(spyRouterPush).toBeCalledTimes(0);

    const wrapperWithoutCategory = wrapperFactory(CategoryForm, {});

    const NEW_CATEGORY = {
      title: 'hi',
      description: 'text',
      iconUrl: 'pic.jpg',
      fields: [
        {
          _id: '6508498bdd39fcd0be367e4e',
          title: 'Base clock',
          fieldType: 'number',
          fieldValue: '',
          fieldUnits: 'GHz',
        },
      ],
    };

    await wrapperWithoutCategory.findComponent(categoryFormTitle).setValue(NEW_CATEGORY.title);
    await wrapperWithoutCategory.findComponent(categoryFormDescription).setValue(NEW_CATEGORY.description);

    wrapperWithoutCategory.vm.formData.iconUrl = NEW_CATEGORY.iconUrl;
    wrapperWithoutCategory.vm.formData.fields = [...NEW_CATEGORY.fields];

    await wrapperWithoutCategory.find(categoryForm).trigger('submit');

    expect(spyMutatePost).toBeCalledTimes(1);
    expect(spyMutatePost).toBeCalledWith(NEW_CATEGORY);

    onSuccessPost();

    expect(spyRefetchQueries).toBeCalledTimes(1);
    expect(spyRefetchQueries).toBeCalledWith(QUERY_KEY);

    await flushPromises();

    expect(spyToastSuccess).toBeCalledTimes(1);

    expect(spyRouterPush).toBeCalledTimes(1);
    expect(spyRouterPush).toBeCalledWith(URL_CATEGORY);
  });
});
