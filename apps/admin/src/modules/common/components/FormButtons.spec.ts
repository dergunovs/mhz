import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import FormButtons from './FormButtons.vue';

import { wrapperFactory, router } from '@/common/test';

const spyRouterGo = vi.spyOn(router, 'go');

const ID = '2534534534534';

const formButtonsSubmit = dataTest('form-buttons-submit');
const formButtonsBack = dataTest('form-buttons-back');
const formButtonsDelete = dataTest('form-buttons-delete');
const formButtonsConfitmModal = dataTest('form-buttons-confirm-modal');

let wrapper: VueWrapper;

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
    expect(spyRouterGo).toBeCalledTimes(0);

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
