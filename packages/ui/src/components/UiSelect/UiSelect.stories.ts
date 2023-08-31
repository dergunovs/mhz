import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';
import { html } from '@/utils';

import { UiSelect } from '@/components';

const meta = {
  component: UiSelect,
  args: {
    modelValue: '',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '11', '111', '12'],
    isFilter: false,
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
  render: (args, { argTypes, updateArgs }) => ({
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
  render: (args, { argTypes, updateArgs }) => ({
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
