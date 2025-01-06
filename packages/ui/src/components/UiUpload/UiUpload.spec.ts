import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiUpload from './UiUpload.vue';
import { LABEL, FILE, FILES } from './constants';

import { wrapperFactory } from '@/test';

const upload = dataTest('ui-upload');
const uploadLabel = dataTest('ui-upload-label');
const uploadRequired = dataTest('ui-upload-required');
const uploadText = dataTest('ui-upload-text');
const uploadAdd = dataTest('ui-upload-add');
const uploadFile = dataTest('ui-upload-file');
const uploadFileSingle = dataTest('ui-upload-file-single');
const uploadFileName = dataTest('ui-upload-file-name');
const uploadFileNameSingle = dataTest('ui-upload-file-name-single');
const uploadFileRemove = dataTest('ui-upload-file-remove');
const uploadFileRemoveSingle = dataTest('ui-upload-file-remove-single');

let wrapper: VueWrapper<InstanceType<typeof UiUpload>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiUpload, { label: LABEL, file: FILE, isSingle: true });
});

enableAutoUnmount(afterEach);

describe('UiUpload', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiUpload)).toBeTruthy();
  });

  it('shows label', async () => {
    expect(wrapper.find(uploadLabel).text()).toBe(LABEL);
  });

  it('shows required * symbol', async () => {
    expect(wrapper.find(uploadRequired).exists()).toBe(false);

    await wrapper.setProps({ isRequired: true });

    expect(wrapper.find(uploadRequired).text()).toBe('*');
  });

  it('shows error', async () => {
    expect(wrapper.find(uploadText).attributes('data-error')).toBe('false');

    await wrapper.setProps({ error: true });

    expect(wrapper.find(uploadText).attributes('data-error')).toBe('true');
  });

  it('disables add button by props', async () => {
    expect(wrapper.find(uploadAdd).attributes('isdisabled')).toBe('true');

    await wrapper.setProps({ file: undefined });

    expect(wrapper.find(uploadAdd).attributes('isdisabled')).toBe('false');

    await wrapper.setProps({ isDisabled: true });

    expect(wrapper.find(uploadAdd).attributes('isdisabled')).toBe('true');
  });

  it('shows single file', async () => {
    expect(wrapper.find(uploadFileSingle).exists()).toBe(true);
    expect(wrapper.find(uploadFileNameSingle).text()).toBe(FILE.name);
  });

  it('removes single file', async () => {
    await wrapper.find(uploadFileRemoveSingle).trigger('click');

    expect(wrapper.emitted('remove')).toHaveLength(1);
    expect(wrapper.emitted('remove')?.[0]).toEqual([FILE]);
  });

  it('shows multiple files', async () => {
    await wrapper.setProps({ file: undefined, files: FILES, isSingle: false });

    expect(wrapper.findAll(uploadFile).length).toBe(FILES.length);
    expect(wrapper.findAll(uploadFileName)[0].text()).toBe(FILES[0].name);
  });

  it('removes file from multiple files list', async () => {
    await wrapper.setProps({ file: undefined, files: FILES, isSingle: false });
    await wrapper.findAll(uploadFileRemove)[0].trigger('click');

    expect(wrapper.emitted('remove')).toHaveLength(1);
    expect(wrapper.emitted('remove')?.[0]).toEqual([FILES[0]]);
  });

  it('emits upload event by upload button click', async () => {
    await wrapper.find(upload).trigger('click');

    expect(wrapper.emitted('upload')).toHaveLength(1);
  });
});
