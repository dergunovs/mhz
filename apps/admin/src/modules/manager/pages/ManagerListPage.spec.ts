import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IManager } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import ManagerListPage from './ManagerListPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as managerServices from '@/manager/services';
import { MANAGERS } from '@/manager/fixtures';

const spyGetManagers = vi.spyOn(managerServices, 'getManagers').mockReturnValue(mockQueryReply(MANAGERS));

const managerList = dataTest('manager-list-page-list');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManagerListPage, {});
});

enableAutoUnmount(afterEach);

describe('ManagerListPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ManagerListPage)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('gets managers and passes them to list props', async () => {
    expect(spyGetManagers).toBeCalledTimes(1);

    expect(wrapper.findComponent<DefineComponent<{ managers: IManager[] }>>(managerList).vm.$props.managers).toEqual(
      MANAGERS.data
    );
  });
});
