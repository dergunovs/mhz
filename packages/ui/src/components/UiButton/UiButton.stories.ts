import { Meta, StoryObj } from '@storybook/vue3';
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
  layout: { control: 'select', options: ['primary', 'secondary', 'plain'], description: 'primary | secondary | plain' },
  type: { control: 'select', options: ['submit', 'button'], description: 'submit | button' },
};

type Story = StoryObj<typeof UiButton>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes }) => ({
    components: { UiButton },
    setup: () => ({ args, argTypes }),

    template: html` <UiButton v-bind="args">Текст кнопки</UiButton>`,
  }),
  argTypes,
};
