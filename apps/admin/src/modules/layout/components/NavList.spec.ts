import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import NavList from './NavList.vue';

import { wrapperFactory } from '@/common/test';
import { NAV_ITEMS } from '@/layout/constants';

const navListItem = dataTest('nav-list-item');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(NavList, {});
});

enableAutoUnmount(afterEach);

describe('NavList', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(NavList)).toBeTruthy();
  });

  it('shows nav list items', async () => {
    expect(wrapper.findAllComponents(navListItem).length).toEqual(NAV_ITEMS.length);
  });
});
