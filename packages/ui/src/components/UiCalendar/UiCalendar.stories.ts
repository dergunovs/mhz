import { Meta, StoryObj } from '@storybook/vue3';

import { html } from '@/utils';
import { UiCalendar } from '@/components';

const meta = {
  component: UiCalendar,
  args: {
    events: [{ start: new Date(), end: new Date(), title: '+', content: [{ id: 1, text: 'Text' }] }],
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiCalendar>;

const argTypes = {};

type Story = StoryObj<typeof UiCalendar>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiCalendar },
    setup: () => ({ args, argTypes }),

    template: html` <UiCalendar v-bind="args" />`,
  }),

  argTypes,
};
