import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiTable from './UiTable.vue';
import { HEADERS, MODEL_VALUE, DEFAULT_SLOT } from './constants';

import { wrapperFactory } from '@/test';

const tableHeader = dataTest('ui-table-header');
const tableHeaderTitle = dataTest('ui-table-header-title');
const tableHeaderSort = dataTest('ui-table-header-sort');
const tableHeaderSortAsc = dataTest('ui-table-header-sort-asc');
const tableHeaderSortDesc = dataTest('ui-table-header-sort-desc');

let wrapper: VueWrapper<InstanceType<typeof UiTable>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiTable, { modelValue: MODEL_VALUE, headers: HEADERS }, { default: DEFAULT_SLOT });
});

enableAutoUnmount(afterEach);

describe('UiTable', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiTable)).toBeTruthy();
  });

  it('shows table headers', async () => {
    expect(wrapper.findAll(tableHeader).length).toBe(HEADERS.length);
    expect(wrapper.findAll(tableHeaderTitle)[0].text()).toBe(HEADERS[0].title);
  });

  it('shows header sort button if value exists', async () => {
    expect(wrapper.findAll(tableHeaderSort).length).toBe(HEADERS.filter((header) => !!header.value).length);
  });

  it('highlights current sort header and direction', async () => {
    const currentItemIndex = HEADERS.map((i) => i.value).indexOf(MODEL_VALUE.value);

    expect(wrapper.findAll(tableHeaderSort)[currentItemIndex].attributes('data-current')).toBe('true');
    expect(wrapper.find(tableHeaderSortAsc).attributes('data-current')).toBe(MODEL_VALUE.isAsc.toString());
    expect(wrapper.find(tableHeaderSortDesc).attributes('data-current')).toBe((!MODEL_VALUE.isAsc).toString());
  });

  it('sorts by header button click', async () => {
    const currentItemIndex = HEADERS.map((i) => i.value).indexOf(MODEL_VALUE.value);

    await wrapper.findAll(tableHeaderSort)[currentItemIndex].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      { value: MODEL_VALUE.value, isAsc: !MODEL_VALUE.isAsc },
    ]);

    const otherItemIndex = currentItemIndex + 1;

    await wrapper.findAll(tableHeaderSort)[otherItemIndex].trigger('click');

    expect(wrapper.emitted('reset')).toHaveLength(1);
    expect(wrapper.emitted('reset')?.[0]).toEqual([HEADERS[otherItemIndex].value]);
  });
});
