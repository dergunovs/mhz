import { Meta, StoryObj } from '@storybook/vue3';
import { html } from '@/utils';

import { UiButton } from '@/components';

const meta = {
  component: UiButton,
  args: {
    slot: 'Текст кнопки',
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiButton>;

const argTypes = {
  layout: { control: 'select', options: ['primary', 'secondary'], description: 'primary | secondary' },
  type: { control: 'select', options: ['submit', 'button'], description: 'submit | button' },
};

type Story = StoryObj<typeof UiButton>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes }) => ({
    components: { UiButton },
    setup: () => ({ args, argTypes }),

    template: html` <UiButton v-bind="args">{{args.slot}}</UiButton>`,
  }),
  argTypes,
};
