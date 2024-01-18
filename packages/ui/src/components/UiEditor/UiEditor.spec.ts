import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VueWrapper, enableAutoUnmount } from '@vue/test-utils';

import UiEditor from './UiEditor.vue';
import { MODEL_VALUE } from './constants';

import { wrapperFactory } from '@/test';

const editor = '[data-test="ui-editor"]';
const editorButton = '[data-test="ui-editor-button"]';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = wrapperFactory(UiEditor, {
    props: { modelValue: MODEL_VALUE },
  });
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
