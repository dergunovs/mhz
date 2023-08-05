import { Meta, StoryObj } from '@storybook/vue3';
import { html } from '@/utils';

import { UiEditor } from '@/components';

const meta = {
  component: UiEditor,
  args: {
    modelValue: 'Text example',
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiEditor>;

const argTypes = {};

type Story = StoryObj<typeof UiEditor>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes }) => ({
    components: { UiEditor },
    setup: () => ({ args, argTypes }),

    template: html` <UiEditor v-bind="args" />`,
  }),
  argTypes,
};
