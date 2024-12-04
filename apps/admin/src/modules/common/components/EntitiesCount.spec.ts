import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IEntitiesCount } from 'mhz-contracts';

import EntitiesCount from './EntitiesCount.vue';

import { wrapperFactory, mockQueryReply } from '@/common/test';
import { COUNT } from '@/common/fixtures';
import * as commonServices from '@/common/services';

const spyGetCount = vi.spyOn(commonServices, 'getEntitiesCount').mockReturnValue(mockQueryReply(COUNT));

const entitiesCountBase = '[data-test="entities-count-base"]';
const entitiesCountProductCategories = '[data-test="entities-count-product-categories"]';
const entitiesCountProductManufacturers = '[data-test="entities-count-product-manufacturers"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(EntitiesCount, {});
});

enableAutoUnmount(afterEach);

describe('EntitiesCount', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(EntitiesCount)).toBeTruthy();
  });

  it('gets entities count', async () => {
    expect(spyGetCount).toBeCalledTimes(1);
  });

  it('passes props to child chart components', async () => {
    expect(wrapper.findComponent<DefineComponent<IEntitiesCount>>(entitiesCountBase).vm.$props.labels).toEqual(
      COUNT.base.labels
    );

    expect(wrapper.findComponent<DefineComponent<IEntitiesCount>>(entitiesCountBase).vm.$props.datasets).toEqual(
      COUNT.base.datasets
    );

    expect(
      wrapper.findComponent<DefineComponent<IEntitiesCount>>(entitiesCountProductCategories).vm.$props.labels
    ).toEqual(COUNT.categories.labels);

    expect(
      wrapper.findComponent<DefineComponent<IEntitiesCount>>(entitiesCountProductCategories).vm.$props.datasets
    ).toEqual(COUNT.categories.datasets);

    expect(
      wrapper.findComponent<DefineComponent<IEntitiesCount>>(entitiesCountProductManufacturers).vm.$props.labels
    ).toEqual(COUNT.manufacturers.labels);

    expect(
      wrapper.findComponent<DefineComponent<IEntitiesCount>>(entitiesCountProductManufacturers).vm.$props.datasets
    ).toEqual(COUNT.manufacturers.datasets);
  });
});
