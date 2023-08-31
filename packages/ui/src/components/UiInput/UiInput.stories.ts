import { Meta, StoryObj } from '@storybook/vue3';
import { html } from '@/utils';

import { UiInput } from '@/components';

const meta = {
  component: UiInput,
  args: {
    modelValue: 'Text',
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiInput>;

const argTypes = {
  modelValue: { description: 'string | number | boolean | null' },
  mode: { description: 'default | select' },
};

type Story = StoryObj<typeof UiInput>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes }) => ({
    components: { UiInput },
    setup: () => ({ args, argTypes }),

    template: html` <UiInput v-bind="args" />`,
  }),
  argTypes,
};
