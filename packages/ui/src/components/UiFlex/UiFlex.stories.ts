import { Meta, StoryObj } from '@storybook/vue3';

import { FIRST_SLOT, SECOND_SLOT } from './constants';

import { html } from '@/utils';
import { UiFlex } from '@/components';

const meta = {
  component: UiFlex,
  args: {},
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiFlex>;

const argTypes = {
  align: {
    options: ['normal', 'stretch', 'center', 'flex-start', 'flex-end'],
  },
  justify: {
    options: ['normal', 'stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
  },
};

type Story = StoryObj<typeof UiFlex>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiFlex },
    setup: () => ({ args, argTypes, FIRST_SLOT, SECOND_SLOT }),

    template: html` <UiFlex v-bind="args">
      <div>{{FIRST_SLOT}}</div>
      <div>{{SECOND_SLOT}}</div>
    </UiFlex>`,
  }),

  argTypes,
};
