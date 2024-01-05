import { Component, ref } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createHead } from '@unhead/vue';

import { VueQueryPlugin } from 'mhz-helpers';
import type { UseQueryReturnType, UseMutationReturnType } from 'mhz-helpers';

import { routes } from '@/common/router/routes';

document.body.innerHTML = '<div id="app"></div>';

const head = createHead();

export const router = createRouter({ history: createWebHistory('/'), routes });

export function wrapperFactory(
  component: Component,
  { mocks, props, slots, stubs }: { mocks?: object; props?: object; slots?: object; stubs?: object }
) {
  return shallowMount(component, {
    global: {
      plugins: [router, VueQueryPlugin],
      provide: {
        usehead: head,
      },

      stubs: {
        RouterLink: { template: '<a><slot></slot></a>' },
        UiField: { template: '<fieldset><slot></slot></fieldset>' },
        UiInput: { template: '<input />' },
        UiButton: { template: '<button><slot></slot></button>' },
        ...stubs,
      },
      mocks,
    },
    props,
    slots,
    attachTo: document.getElementById('app') as HTMLElement,
  });
}

export function mockQueryReply<T>(reply: object) {
  return { data: ref(reply) } as UseQueryReturnType<T, Error>;
}

export function mockMutationReply<T, T2>() {
  return { mutate: vi.fn() } as unknown as UseMutationReturnType<T, Error, T2, unknown>;
}
