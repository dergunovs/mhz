import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IManager } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import ManagerEditPage from './ManagerEditPage.vue';

import { mockQueryReply, wrapperFactory } from '@/common/test';
import * as managerServices from '@/manager/services';
import { MANAGERS } from '@/manager/fixtures';

const MANAGER = MANAGERS.data[0];

const spyGetManager = vi.spyOn(managerServices, 'getManager').mockReturnValue(mockQueryReply(MANAGER));

const managerEditPageForm = dataTest('manager-edit-page-form');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManagerEditPage, {});
});

enableAutoUnmount(afterEach);

describe('ManagerEditPage', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ManagerEditPage)).toBeTruthy();
  });

  it('gets manager and passes it to form props', async () => {
    expect(spyGetManager).toBeCalledTimes(1);

    expect(
      wrapper.findComponent<DefineComponent<{ manager: IManager }>>(managerEditPageForm).vm.$props.manager
    ).toEqual(MANAGER);
  });
});
