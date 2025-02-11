import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import NavItem from './NavItem.vue';

import { wrapperFactory } from '@/common/test';
import NavMainIcon from '@/layout/icons/nav-main.svg?component';

const NAV_ITEM = {
  _id: '1',
  url: '/page',
  title: 'title',
  icon: NavMainIcon,
};

const navItem = dataTest('nav-item');
const navItemIcon = dataTest('nav-item-icon');
const navItemTitle = dataTest('nav-item-title');

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

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows icon and title', async () => {
    expect(wrapper.findComponent(navItemIcon).exists()).toEqual(true);
    expect(wrapper.find(navItemTitle).text()).toEqual(NAV_ITEM.title);
  });

  it('generates link', async () => {
    expect(wrapper.findComponent(navItem).attributes('to')).toEqual(NAV_ITEM.url);
  });
});
