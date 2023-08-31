import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';
import { html } from '@/utils';

import { UiSearch } from '@/components';

const meta = {
  component: UiSearch,
  args: {
    modelValue: '',
    isSuccess: true,
    results: {
      products: [{ _id: '1', title: 'AMD Ryzen 7700X' }],
      manufacturers: [{ _id: '1', title: 'AMD' }],
    },
    searchScheme: [
      { type: 'products', labels: ['title'], url: '/' },
      { type: 'manufacturers', labels: ['title'], url: '/' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiSearch>;

const argTypes = {
  results: { description: '{_id: string, ...}[]' },
  searchScheme: { description: '{ type: string; labels: string[]; url: string }[]' },
};

type Story = StoryObj<typeof UiSearch>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes, updateArgs }) => ({
    components: { UiSearch },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <UiSearch v-bind="args" @update:modelValue="update" />`,

    methods: {
      update(value: string) {
        updateArgs({ modelValue: value });
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
