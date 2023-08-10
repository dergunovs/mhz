import { Meta, StoryObj } from '@storybook/vue3';
import { html } from '@/utils';

import { UiCheckbox } from '@/components';

const meta = {
  component: UiCheckbox,
  args: {
    modelValue: true,
    label: 'Label',
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiCheckbox>;

const argTypes = {
  error: { control: 'boolean', description: 'string | boolean' },
};

type Story = StoryObj<typeof UiCheckbox>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes }) => ({
    components: { UiCheckbox },
    setup: () => ({ args, argTypes }),

    template: html` <UiCheckbox v-bind="args" /> `,
  }),
  argTypes,
};
