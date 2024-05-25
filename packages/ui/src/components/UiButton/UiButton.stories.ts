import { Meta, StoryObj } from '@storybook/vue3';

import { DEFAULT_SLOT } from './constants';
import IconTest from './icons/test.svg?component';

import { html } from '@/utils';
import { UiButton } from '@/components';

const meta = {
  component: UiButton,
  args: {},
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiButton>;

const argTypes = {
  layout: {
    options: ['primary', 'secondary', 'plain', 'accent', 'gradient'],
  },
  type: {
    options: ['submit', 'button'],
  },
};

type Story = StoryObj<typeof UiButton>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiButton },
    setup: () => ({ args, argTypes, DEFAULT_SLOT }),

    template: html` <UiButton v-bind="args">{{DEFAULT_SLOT}}</UiButton>`,
  }),
  argTypes,
};

export const Icon: Story = {
  render: (args) => ({
    components: { UiButton },
    setup: () => ({ args, argTypes, DEFAULT_SLOT, IconTest }),

    template: html` <UiButton v-bind="args" :icon="IconTest">{{DEFAULT_SLOT}}</UiButton>`,
  }),
  argTypes,
};
