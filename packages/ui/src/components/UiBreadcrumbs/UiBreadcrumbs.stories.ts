import { Meta, StoryObj } from '@storybook/vue3';

import { LINKS } from './constants';

import { html } from '@/utils';
import { UiBreadcrumbs } from '@/components';

const meta = {
  component: UiBreadcrumbs,
  args: {
    links: LINKS,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiBreadcrumbs>;

const argTypes = {
  links: {
    description: '{ url: string; title: string }[]',
  },
  color: {
    options: ['default', 'white'],
  },
};

type Story = StoryObj<typeof UiBreadcrumbs>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiBreadcrumbs },
    setup: () => ({ args, argTypes }),

    template: html` <UiBreadcrumbs v-bind="args" />`,
  }),
  argTypes,
};
