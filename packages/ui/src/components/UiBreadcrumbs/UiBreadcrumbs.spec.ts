import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiBreadcrumbs from './UiBreadcrumbs.vue';

import { DEFAULT_COLOR, LINKS } from './constants';

import { wrapperFactory } from '@/test';

const breadcrumb = dataTest('ui-breadcrumb');
const breadcrumbLink = dataTest('ui-breadcrumb-link');
const breadcrumbTitle = dataTest('ui-breadcrumb-title');
const breadcrumbSlash = dataTest('ui-breadcrumb-slash');
const breadcrumbPosition = dataTest('ui-breadcrumb-position');

let wrapper: VueWrapper<InstanceType<typeof UiBreadcrumbs>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiBreadcrumbs, { color: DEFAULT_COLOR, links: LINKS });
});

enableAutoUnmount(afterEach);

describe('UiBreadcrumbs', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiBreadcrumbs)).toBeTruthy();
  });

  it('shows breadcrumbs', async () => {
    expect(wrapper.findAll(breadcrumb).length).toBe(LINKS.length);
  });

  it('shows breadcrumb title', async () => {
    expect(wrapper.findAll(breadcrumbTitle)[0].text()).toBe(LINKS[0].title);
  });

  it('sets breadcrumb position in meta', async () => {
    const index = 2;

    expect(wrapper.findAll(breadcrumbPosition)[index].attributes('content')).toBe((index + 1).toString());
  });

  it('generates links except last element', async () => {
    expect(wrapper.findAll(breadcrumbLink)[0].attributes('to')).toBe(LINKS[0].url);
    expect(wrapper.findAll(breadcrumbLink)[0].attributes('data-link')).toBe('true');

    expect(wrapper.findAll(breadcrumbLink)[LINKS.length - 1].attributes('data-link')).toBe('false');
  });

  it('shows slashes after links except last element', async () => {
    expect(wrapper.findAll(breadcrumbSlash).length).toBe(LINKS.length - 1);
  });

  it('changes color by props', async () => {
    expect(wrapper.findAll(breadcrumbLink)[0].attributes('data-color')).toBe(DEFAULT_COLOR);
    expect(wrapper.findAll(breadcrumbSlash)[0].attributes('data-color')).toBe(DEFAULT_COLOR);

    const newColor = 'white';

    await wrapper.setProps({ color: newColor });

    expect(wrapper.findAll(breadcrumbLink)[0].attributes('data-color')).toBe(newColor);
    expect(wrapper.findAll(breadcrumbSlash)[0].attributes('data-color')).toBe(newColor);
  });
});
