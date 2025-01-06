import { Component, ComponentPublicInstance } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { debounce } from 'perfect-debounce';

export function wrapperFactory<T>(
  component: Component<T>,
  props?: Partial<ComponentPublicInstance<T>['$props']>,
  slots?: { default: string }
) {
  document.body.innerHTML = '<div id="app"></div>';

  return shallowMount(component, {
    global: {
      stubs: { RouterLink: { template: '<a><slot></slot></a>' } },
    },
    props: props as ComponentPublicInstance<T>['$props'],
    slots: slots as undefined,
    mocks: { debounce },
    attachTo: document.getElementById('app') as HTMLElement,
  });
}
