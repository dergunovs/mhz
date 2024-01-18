import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import ManagerList from './ManagerList.vue';

import { wrapperFactory } from '@/common/test';
import { URL_MANAGER_EDIT } from '@/manager/constants';
import { MANAGERS } from '@/manager/fixtures';

const managerListRow = '[data-test="manager-list-row"]';
const managerListLink = '[data-test="manager-list-link"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ManagerList, {
    props: {
      managers: MANAGERS.data,
    },
  });
});

enableAutoUnmount(afterEach);

describe('ManagerList', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ManagerList)).toBeTruthy();
  });

  it('shows rows if managers props', async () => {
    expect(wrapper.findAll(managerListRow).length).toEqual(MANAGERS.data.length);

    await wrapper.setProps({ managers: [] });

    expect(wrapper.find(managerListRow).exists()).toBe(false);
  });

  it('generated link to manager', async () => {
    const LINK = `${URL_MANAGER_EDIT}/${MANAGERS.data[0]._id}`;

    expect(wrapper.find(managerListLink).attributes('to')).toEqual(LINK);
  });

  it('shows manager content in cells', async () => {
    expect(wrapper.find(managerListLink).text()).toEqual(MANAGERS.data[0].email);
  });
});
