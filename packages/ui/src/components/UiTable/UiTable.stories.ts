import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';

import { HEADERS, MODEL_VALUE, DEFAULT_SLOT } from './constants';

import { html } from '@/utils';
import { UiTable } from '@/components';

const meta = {
  component: UiTable,
  args: {
    headers: HEADERS,
    modelValue: MODEL_VALUE,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiTable>;

const argTypes = {
  headers: { description: '{ value: string; title: string }[]' },
};

type Story = StoryObj<typeof UiTable>;

export default meta;

export const Primary: Story = {
  render: (args, { updateArgs }) => ({
    components: { UiTable },
    setup: () => ({ args, argTypes, updateArgs, DEFAULT_SLOT }),

    template: html` <UiTable v-bind="args" @update:modelValue="update">
      <tr>
        <td>1</td>
        <td>Frosinone</td>
        <td>Frosinone.it</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Genoa</td>
        <td>Genoa.it</td>
      </tr>
    </UiTable>`,

    methods: {
      update(sort: { value: string; dir: 'asc' | 'desc' }) {
        updateArgs({ modelValue: { ...sort } });
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
