import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';

import { MODEL_VALUE, IS_CONFIRM } from './constants';

import { html } from '@/utils';
import { UiModal, UiButton } from '@/components';

const meta = {
  component: UiModal,
  args: {
    modelValue: MODEL_VALUE,
    isConfirm: IS_CONFIRM,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiModal>;

const argTypes = {};

type Story = StoryObj<typeof UiModal>;

export default meta;

export const Primary: Story = {
  args: {
    modelValue: {
      bubbles: true,
      cancelBubble: false,
      cancelable: true,
      composed: true,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      returnValue: true,
      srcElement: {},
      target: {},
      timeStamp: 3161.5,
      type: 'click',
    },

    width: '200',
  },

  render: (args, { updateArgs }) => ({
    components: { UiModal, UiButton },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <div>
      <UiButton @click="update">Show modal</UiButton>
      <UiModal v-bind="args" @update:modelValue="update">Text inside</UiModal>
    </div>`,

    methods: {
      update(value: boolean) {
        updateArgs({ modelValue: value });
      },
    },
  }),

  decorators: [
    (story, context) => {
      const [args, updateArgs] = useArgs();

      return story({ ...context, updateArgs, args });
    },
  ],

  argTypes,
};
