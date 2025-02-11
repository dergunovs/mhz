import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import TheSearch from './TheSearch.vue';

import { wrapperFactory, mockQueryReply } from '@/common/test';
import * as commonServices from '@/common/services';

const SEARCH_RESULTS = {
  products: [{ _id: '64d8d74249f373457450ccef', title: 'AMD Ryzen 9 7950X' }],
  categories: [],
};

const SMALL_QUERY = 'A';
const QUERY = 'AMD';

const refetch = vi.fn();

vi.spyOn(commonServices, 'search').mockImplementation(() => {
  return mockQueryReply<{ [key: string]: { _id: string }[] }>(SEARCH_RESULTS, refetch);
});

const search = dataTest('search');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(TheSearch, {});
});

enableAutoUnmount(afterEach);

describe('TheSearch', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(TheSearch)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('searches by watching input', async () => {
    expect(refetch).toBeCalledTimes(0);

    await wrapper.findComponent(search).setValue(SMALL_QUERY);

    expect(refetch).toBeCalledTimes(0);

    await wrapper.findComponent(search).setValue(QUERY);

    expect(refetch).toBeCalledTimes(1);
  });
});
