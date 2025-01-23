import { ref } from 'vue';
import { Meta, StoryObj } from '@storybook/vue3';

import { EVENTS } from './constants';
import { ICalendarEvent } from './interface';
import { html } from '@/utils';
import { UiCalendar, UiModal } from '@/components';

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

const isShowModal = ref(false);
const eventContent = ref();

function toggleModal() {
  isShowModal.value = !isShowModal.value;
}

const argTypes = {};

type Story = StoryObj<typeof UiCalendar>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiCalendar, UiModal },
    setup: () => ({ args, argTypes, isShowModal, toggleModal, eventContent }),

    template: html` <UiCalendar v-bind="args" @eventClick="handleEvent" />
      <UiModal v-model="isShowModal">{{eventContent}}</UiModal>`,

    methods: {
      handleEvent(event: ICalendarEvent<object>) {
        eventContent.value = event.id;
        toggleModal();
      },
    },
  }),

  argTypes,
};
