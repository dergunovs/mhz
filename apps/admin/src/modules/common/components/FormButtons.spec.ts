import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import FormButtons from './FormButtons.vue';

import { wrapperFactory, router } from '@/common/test';

let wrapper: VueWrapper;

const formButtonsSubmit = '[data-test="form-buttons-submit"]';
const formButtonsBack = '[data-test="form-buttons-back"]';
const formButtonsDelete = '[data-test="form-buttons-delete"]';
const formButtonsConfitmModal = '[data-test="form-buttons-confirm-modal"]';

const spyRouterGo = vi.spyOn(router, 'go');

const ID = '2534534534534';

beforeEach(() => {
  wrapper = wrapperFactory(FormButtons, {
    props: { id: ID, isLoading: false },
  });
});

enableAutoUnmount(afterEach);

describe('FormButtons', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(FormButtons)).toBeTruthy();
  });

  it('shows delete button if id props exists', async () => {
    expect(wrapper.findComponent(formButtonsDelete).exists()).toEqual(true);

    await wrapper.setProps({ id: undefined });

    expect(wrapper.findComponent(formButtonsDelete).exists()).toEqual(false);
  });

  it('disables buttons by loading props', async () => {
    expect(wrapper.findComponent(formButtonsSubmit).attributes('isdisabled')).toEqual('false');
    expect(wrapper.findComponent(formButtonsBack).attributes('isdisabled')).toEqual('false');
    expect(wrapper.findComponent(formButtonsDelete).attributes('isdisabled')).toEqual('false');

    await wrapper.setProps({ isLoading: true });

    expect(wrapper.findComponent(formButtonsSubmit).attributes('isdisabled')).toEqual('true');
    expect(wrapper.findComponent(formButtonsBack).attributes('isdisabled')).toEqual('true');
    expect(wrapper.findComponent(formButtonsDelete).attributes('isdisabled')).toEqual('true');
  });

  it('changes submit button text by id props', async () => {
    expect(wrapper.findComponent(formButtonsSubmit).text()).toEqual('Update');

    await wrapper.setProps({ id: undefined });

    expect(wrapper.findComponent(formButtonsSubmit).text()).toEqual('Submit');
  });

  it('pushed to previous page by back button click', async () => {
    await wrapper.findComponent(formButtonsBack).trigger('click');

    expect(spyRouterGo).toBeCalledTimes(1);
    expect(spyRouterGo).toBeCalledWith(-1);
  });

  it('emits delete by delete button click with confirm', async () => {
    expect(wrapper.findComponent(formButtonsConfitmModal).attributes('modelvalue')).toEqual('false');

    await wrapper.findComponent(formButtonsDelete).trigger('click');

    expect(wrapper.findComponent(formButtonsConfitmModal).attributes('modelvalue')).toEqual('true');

    wrapper.findComponent<DefineComponent>(formButtonsConfitmModal).vm.$emit('confirm');

    expect(wrapper.emitted()['delete']).toHaveLength(1);
    expect(wrapper.emitted()['delete'][0]).toEqual([ID]);
  });
});
