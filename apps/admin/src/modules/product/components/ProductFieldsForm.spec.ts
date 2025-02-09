import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import * as helpers from 'mhz-helpers';
import { dataTest } from 'mhz-helpers';

import ProductFieldsForm from './ProductFieldsForm.vue';

import { wrapperFactory } from '@/common/test';
import { PRODUCTS } from '@/product/fixtures';

const spyDeleteTempId = vi.spyOn(helpers, 'deleteTempId');

const FIELDS = PRODUCTS.data[0].fields;

const productFieldsFormField = dataTest('product-fields-form-field');
const productFieldsFormBoolean = dataTest('product-fields-form-boolean');
const productFieldsFormValue = dataTest('product-fields-form-value');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ProductFieldsForm, {
    props: {
      fields: FIELDS,
      updates: 0,
    },
  });
});

enableAutoUnmount(afterEach);

describe('ProductFieldsForm', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ProductFieldsForm)).toBeTruthy();
  });

  it('shows fields with specific components', async () => {
    expect(wrapper.findAll(productFieldsFormField).length).toEqual(FIELDS?.length);

    const booleanFieds = FIELDS?.filter((field) => field.fieldType === 'boolean').length;

    expect(wrapper.findAll(productFieldsFormBoolean).length).toEqual(booleanFieds);

    const valueFields = FIELDS?.filter((field) => field.fieldType === 'number' || field.fieldType === 'string').length;

    expect(wrapper.findAll(productFieldsFormValue).length).toEqual(valueFields);
  });

  it('emits updated form data by values update', async () => {
    expect(wrapper.emitted()['update']).toHaveLength(1);
    expect(wrapper.emitted()['update'][0]).toEqual([FIELDS]);

    await wrapper.findComponent(productFieldsFormBoolean).setValue(true);

    expect(wrapper.emitted()['update']).toHaveLength(2);
  });

  it('deletes ids of fields', async () => {
    expect(spyDeleteTempId).toBeCalledTimes(1);
    expect(spyDeleteTempId).toBeCalledWith(FIELDS, true);

    await wrapper.setProps({ updates: 1 });

    expect(spyDeleteTempId).toBeCalledTimes(2);
  });
});
