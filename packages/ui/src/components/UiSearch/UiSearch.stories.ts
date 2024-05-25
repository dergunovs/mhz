import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';

import { MODEL_VALUE, IS_SUCCESS, RESULTS, SEARCH_SCHEME } from './constants';

import { html } from '@/utils';
import { UiSearch } from '@/components';

const meta = {
  component: UiSearch,
  args: {
    modelValue: MODEL_VALUE,
    isSuccess: IS_SUCCESS,
    results: RESULTS,
    searchScheme: SEARCH_SCHEME,
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
  searchScheme: { description: '{ type: string; labels: string[]; url: string }[]' },
};

type Story = StoryObj<typeof UiSearch>;

export default meta;

export const Primary: Story = {
  render: (args, { updateArgs }) => ({
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
