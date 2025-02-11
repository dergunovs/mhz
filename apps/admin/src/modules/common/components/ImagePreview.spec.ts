import { DefineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { IBaseReply } from 'mhz-contracts';
import { dataTest } from 'mhz-helpers';

import ImagePreview from './ImagePreview.vue';

import { mockMutationReply, wrapperFactory } from '@/common/test';
import * as commonServices from '@/common/services';

const URLS = ['1.jpg', '2.jpg'];

const spyMutateDelete = vi.fn();

vi.spyOn(commonServices, 'deleteFile').mockImplementation(() => {
  return mockMutationReply<IBaseReply, { url: string; isThumb: boolean }>(spyMutateDelete);
});

const imagePreviewSortable = dataTest('image-preview-sortable');
const imagePreviewDelete = dataTest('image-preview-delete');

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(ImagePreview, {
    props: {
      urls: URLS,
      isThumb: false,
    },
  });
});

enableAutoUnmount(afterEach);

describe('ImagePreview', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(ImagePreview)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('passes props to child sortable component', async () => {
    expect(wrapper.findComponent<DefineComponent>(imagePreviewSortable).vm.$attrs.list).toEqual(URLS);
  });

  it('updates index by child sortable component emit', async () => {
    const OLD_INDEX = 1;
    const NEW_INDEX = 0;

    wrapper
      .findComponent<DefineComponent>(imagePreviewSortable)
      .vm.$emit('end', { oldIndex: OLD_INDEX, newIndex: NEW_INDEX });

    expect(wrapper.emitted()['update']).toHaveLength(1);
    expect(wrapper.emitted()['update'][0]).toEqual([[URLS[OLD_INDEX], URLS[NEW_INDEX]]]);
  });

  it('deletes image by delete button click', async () => {
    expect(spyMutateDelete).toBeCalledTimes(0);

    await wrapper.findComponent(imagePreviewDelete).trigger('click');

    expect(spyMutateDelete).toBeCalledTimes(1);
    expect(wrapper.emitted()['delete']).toHaveLength(1);
  });
});
