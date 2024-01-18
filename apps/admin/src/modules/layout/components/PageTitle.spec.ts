import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import PageTitle from './PageTitle.vue';

import { wrapperFactory } from '@/common/test';
import { IPageTitleLink } from '@/layout/interface';

const LINKS = [
  { url: '/main', title: 'Main' },
  { url: '/about', title: 'About' },
];

const TITLE = 'Title';

const pageTitleBreadcrumbs = '[data-test="page-title-breadcrumbs"]';
const pageTitleHeader = '[data-test="page-title-header"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(PageTitle, {
    props: { links: LINKS },
    slots: { default: TITLE },
  });
});

enableAutoUnmount(afterEach);

describe('PageTitle', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(PageTitle)).toBeTruthy();
  });

  it('passes props to breadcrumbs', async () => {
    expect(
      wrapper.findComponent<DefineComponent<{ links: IPageTitleLink[] }>>(pageTitleBreadcrumbs).vm.$props.links
    ).toEqual(LINKS);
  });

  it('shows breadcrumbs only if they exists', async () => {
    expect(wrapper.findComponent(pageTitleBreadcrumbs).exists()).toEqual(true);

    await wrapper.setProps({ links: undefined });

    expect(wrapper.findComponent(pageTitleBreadcrumbs).exists()).toEqual(false);
  });

  it('shows header in slot', async () => {
    expect(wrapper.find(pageTitleHeader).text()).toEqual(TITLE);
  });
});
