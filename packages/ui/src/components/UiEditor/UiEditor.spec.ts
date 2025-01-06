import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';
import { dataTest } from 'mhz-helpers';

import UiEditor from './UiEditor.vue';
import { MODEL_VALUE } from './constants';

import { wrapperFactory } from '@/test';

const editor = dataTest('ui-editor');
const editorButton = dataTest('ui-editor-button');

let wrapper: VueWrapper<InstanceType<typeof UiEditor>>;

beforeEach(() => {
  wrapper = wrapperFactory(UiEditor, { modelValue: MODEL_VALUE });
});

enableAutoUnmount(afterEach);

describe('UiEditor', async () => {
  it('exists', async () => {
    expect(wrapper.findComponent(UiEditor)).toBeTruthy();
  });

  it('has editor', async () => {
    expect(wrapper.find(editor).exists()).toBe(true);
  });

  it('has editor buttons', async () => {
    expect(wrapper.findAll(editorButton).length).toBeGreaterThan(1);
  });
});
