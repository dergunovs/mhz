import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiPagination from './UiPagination.vue';
import { PAGE, TOTAL } from './constants';

import { wrapperFactory } from '@/test';

const pagination = dataTest('ui-pagination');
const paginationFirst = dataTest('ui-pagination-first');
const paginationPrev = dataTest('ui-pagination-prev');
const paginationNext = dataTest('ui-pagination-next');
const paginationLast = dataTest('ui-pagination-last');

let wrapper: VueWrapper<InstanceType<typeof UiPagination>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiPagination, { page: PAGE, total: TOTAL });
});

enableAutoUnmount(afterEach);

describe('UiPagination', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiPagination)).toBeTruthy();
  });

  it('shows pagination text', async () => {
    expect(wrapper.find(pagination).text()).toBe(`${PAGE} of ${TOTAL}`);
  });

  it('handles pagination next and last buttons clicks', async () => {
    await wrapper.find(paginationNext).trigger('click');

    expect(wrapper.emitted('update')).toHaveLength(1);
    expect(wrapper.emitted('update')?.[0]).toEqual([PAGE + 1]);

    await wrapper.find(paginationLast).trigger('click');

    expect(wrapper.emitted('update')).toHaveLength(2);
    expect(wrapper.emitted('update')?.[1]).toEqual([TOTAL]);
  });

  it('handles pagination prev and first buttons clicks', async () => {
    await wrapper.setProps({ page: TOTAL });

    await wrapper.find(paginationPrev).trigger('click');

    expect(wrapper.emitted('update')).toHaveLength(1);
    expect(wrapper.emitted('update')?.[0]).toEqual([TOTAL - 1]);

    await wrapper.find(paginationFirst).trigger('click');

    expect(wrapper.emitted('update')).toHaveLength(2);
    expect(wrapper.emitted('update')?.[1]).toEqual([PAGE]);
  });

  it('disables buttons by current and total pages condition', async () => {
    expect(wrapper.find(paginationPrev).attributes('disabled')).toBe('');
    expect(wrapper.find(paginationFirst).attributes('disabled')).toBe('');
    expect(wrapper.find(paginationNext).attributes('disabled')).toBe(undefined);
    expect(wrapper.find(paginationLast).attributes('disabled')).toBe(undefined);

    await wrapper.setProps({ page: TOTAL });

    expect(wrapper.find(paginationPrev).attributes('disabled')).toBe(undefined);
    expect(wrapper.find(paginationFirst).attributes('disabled')).toBe(undefined);
    expect(wrapper.find(paginationNext).attributes('disabled')).toBe('');
    expect(wrapper.find(paginationLast).attributes('disabled')).toBe('');

    await wrapper.setProps({ page: TOTAL - 1 });

    expect(wrapper.find(paginationPrev).attributes('disabled')).toBe(undefined);
    expect(wrapper.find(paginationFirst).attributes('disabled')).toBe(undefined);
    expect(wrapper.find(paginationNext).attributes('disabled')).toBe(undefined);
    expect(wrapper.find(paginationLast).attributes('disabled')).toBe(undefined);
  });
});
