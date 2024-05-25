import { Meta, StoryObj } from '@storybook/vue3';

import { MODEL_VALUE } from './constants';

import { html } from '@/utils';
import { UiInput } from '@/components';

const meta = {
  component: UiInput,
  args: {
    modelValue: MODEL_VALUE,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiInput>;

const argTypes = {};

type Story = StoryObj<typeof UiInput>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiInput },
    setup: () => ({ args, argTypes }),

    template: html` <UiInput v-bind="args" />`,
  }),
  argTypes,
};
