import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';

import { TITLE, MODEL_VALUE } from './constants';

import { html } from '@/utils';
import { UiSpoiler } from '@/components';

const meta = {
  component: UiSpoiler,
  args: {
    title: TITLE,
    modelValue: MODEL_VALUE,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiSpoiler>;

const argTypes = {};

type Story = StoryObj<typeof UiSpoiler>;

export default meta;

export const Primary: Story = {
  render: (args, { updateArgs }) => ({
    components: { UiSpoiler },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <UiSpoiler v-bind="args" @update:modelValue="update">Inner Content</UiSpoiler>`,

    methods: {
      update(value: boolean) {
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
