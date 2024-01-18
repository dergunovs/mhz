import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import NavItem from './NavItem.vue';

import { wrapperFactory } from '@/common/test';
import NavMainIcon from '@/layout/icons/nav-main.svg?component';

const NAV_ITEM = {
  _id: '1',
  url: '/page',
  title: 'title',
  icon: NavMainIcon,
};

const navItem = '[data-test="nav-item"]';
const navItemIcon = '[data-test="nav-item-icon"]';
const navItemTitle = '[data-test="nav-item-title"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(NavItem, {
    props: {
      navItem: NAV_ITEM,
    },
  });
});

enableAutoUnmount(afterEach);

describe('NavItem', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(NavItem)).toBeTruthy();
  });

  it('shows icon and title', async () => {
    expect(wrapper.findComponent(navItemIcon).exists()).toEqual(true);
    expect(wrapper.find(navItemTitle).text()).toEqual(NAV_ITEM.title);
  });

  it('generates link', async () => {
    expect(wrapper.findComponent(navItem).attributes('to')).toEqual(NAV_ITEM.url);
  });
});
