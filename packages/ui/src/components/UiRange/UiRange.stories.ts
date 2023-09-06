import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';
import { html } from '@/utils';

import { UiRange } from '@/components';

const meta = {
  component: UiRange,
  args: {
    modelValue: [100, 600],
    min: 10,
    max: 1000,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiRange>;

const argTypes = {};

type Story = StoryObj<typeof UiRange>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes, updateArgs }) => ({
    components: { UiRange },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <UiRange v-bind="args" @update:modelValue="update" /> `,

    methods: {
      update(value: [number, number]) {
        updateArgs({ modelValue: [...value] });
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
