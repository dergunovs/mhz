import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';

import { MODEL_VALUE, OPTIONS, IS_FILTER } from './constants';

import { html } from '@/utils';
import { UiSelect } from '@/components';

const meta = {
  component: UiSelect,
  args: {
    modelValue: MODEL_VALUE,
    options: OPTIONS,
    isFilter: IS_FILTER,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiSelect>;

const argTypes = {
  modelValue: { description: 'string | { _id?: string; title: string }' },
  options: { description: 'string[] | { _id?: string; title: string }[]' },
};

type Story = StoryObj<typeof UiSelect>;

export default meta;

export const Primary: Story = {
  args: {
    modelValue: '1',
  },

  render: (args, { updateArgs }) => ({
    components: { UiSelect },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <UiSelect v-bind="args" @update:modelValue="update" />`,

    methods: {
      update(option: string) {
        updateArgs({ modelValue: option });
      },
    },
  }),

  decorators: [
    (story, context) => {
      const [args, updateArgs] = useArgs();

      return story({ ...context, updateArgs, args });
    },
  ],

  argTypes,
};

export const Filter: Story = {
  render: (args, { updateArgs }) => ({
    components: { UiSelect },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <UiSelect v-bind="args" @update:modelValue="update" isFilter />`,

    methods: {
      update(option: string) {
        updateArgs({ modelValue: option });
      },
    },
  }),

  decorators: [
    (story, context) => {
      const [args, updateArgs] = useArgs();

      return story({ ...context, updateArgs, args });
    },
  ],

  argTypes,
};
