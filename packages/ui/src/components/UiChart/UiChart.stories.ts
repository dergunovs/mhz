import { Meta, StoryObj } from '@storybook/vue3';

import { LABELS, DATASETS, TITLE, TYPE } from './constants';

import { html } from '@/utils';
import { UiChart } from '@/components';

const meta = {
  component: UiChart,
  args: {
    labels: LABELS,
    datasets: DATASETS,
    title: TITLE,
    type: TYPE,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiChart>;

const argTypes = {};

type Story = StoryObj<typeof UiChart>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiChart },
    setup: () => ({ args, argTypes }),

    template: html` <UiChart v-bind="args" />`,
  }),
  argTypes,
};
