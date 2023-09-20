import { shallowMount } from '@vue/test-utils';
import { Component } from 'vue';

export function wrapperFactory(
  component: Component,
  { mocks, props, slots, stubs }: { mocks?: object; props?: object; slots?: object; stubs?: object }
) {
  return shallowMount(component, {
    global: {
      stubs: {
        RouterLink: { template: '<a><slot></slot></a>' },
        ...stubs,
      },
      mocks,
    },
    props,
    slots,
  });
}
