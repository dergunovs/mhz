import { Meta, StoryObj } from '@storybook/vue3';

import { EVENTS } from './constants';
import { ICalendarEvent } from './interface';
import { html } from '@/utils';
import { UiCalendar } from '@/components';

const meta = {
  component: UiCalendar,
  args: {
    events: EVENTS,
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

    template: html` <UiCalendar v-bind="args" @eventClick="handleEvent" />`,

    methods: {
      handleEvent(event: ICalendarEvent<object>) {
        alert(event.id);
      },
    },
  }),

  argTypes,
};
