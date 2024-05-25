import { Meta, StoryObj } from '@storybook/vue3';
import { html } from '@/utils';

import ToastStory from '@/components/toast/ToastStory.vue';

const meta = {
  component: ToastStory,
  args: {},
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof ToastStory>;

const argTypes = {};

type Story = StoryObj<typeof ToastStory>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { ToastStory },
    setup: () => ({ args, argTypes }),

    template: html` <ToastStory />`,
  }),
  argTypes,
};
