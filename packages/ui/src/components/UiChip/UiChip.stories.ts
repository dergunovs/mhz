import { Meta, StoryObj } from '@storybook/vue3';

import { DEFAULT_SLOT } from './constants';

import { html } from '@/utils';
import { UiChip } from '@/components';

const meta = {
  component: UiChip,
  args: {},
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiChip>;

const argTypes = {
  type: {
    options: ['default', 'success', 'error'],
  },
};

type Story = StoryObj<typeof UiChip>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiChip },
    setup: () => ({ args, argTypes, DEFAULT_SLOT }),

    template: html` <UiChip v-bind="args">{{DEFAULT_SLOT}}</UiChip>`,
  }),
  argTypes,
};
