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
  modelValue: {
    description: 'boolean | string | number',
  },
  initialValue: {
    description: 'boolean | string | number',
  },
};

type Story = StoryObj<typeof UiCheckbox>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiCheckbox },
    setup: () => ({ args, argTypes }),

    template: html` <UiCheckbox v-bind="args" /> `,
  }),
  argTypes,
};
