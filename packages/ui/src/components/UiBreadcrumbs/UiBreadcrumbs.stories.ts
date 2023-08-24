import { Meta, StoryObj } from '@storybook/vue3';
import { html } from '@/utils';

import { UiBreadcrumbs } from '@/components';

const meta = {
  component: UiBreadcrumbs,
  args: {
    links: [
      { url: '/', title: 'Main' },
      { url: '/category', title: 'Category' },
      { url: '/cpu', title: 'CPU' },
    ],
    color: 'white',
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiBreadcrumbs>;

const argTypes = {};

type Story = StoryObj<typeof UiBreadcrumbs>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes }) => ({
    components: { UiBreadcrumbs },
    setup: () => ({ args, argTypes }),

    template: html` <UiBreadcrumbs v-bind="args" />`,
  }),
  argTypes,
};
