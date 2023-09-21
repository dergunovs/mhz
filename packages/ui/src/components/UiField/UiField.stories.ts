import { Meta, StoryObj } from '@storybook/vue3';

import { ERROR, LABEL } from './constants';

import { html } from '@/utils';
import { UiField, UiInput } from '@/components';

const meta = {
  component: UiField,
  args: {
    label: LABEL,
    error: ERROR,
    isRequired: true,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiField>;

const argTypes = {
  error: { control: 'text', description: 'string | false' },
};

type Story = StoryObj<typeof UiField>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes }) => ({
    components: { UiField, UiInput },
    setup: () => ({ args, argTypes }),

    template: html` <UiField v-bind="args">
      <UiInput modelValue="Text" />
    </UiField>`,
  }),
  argTypes,
};
