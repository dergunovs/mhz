import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';
import { html } from '@/utils';

import { UiTable } from '@/components';

const meta = {
  component: UiTable,
  args: {
    headers: [
      { value: 'position', title: 'Position' },
      { value: 'team', title: 'Team' },
      { value: 'games', title: 'Games' },
      { value: 'points', title: 'Points' },
    ],
    modelValue: { value: 'position', isAsc: true },
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
  render: (args, { argTypes, updateArgs }) => ({
    components: { UiTable },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <UiTable v-bind="args" @update:modelValue="update">
      <tr>
        <td>1</td>
        <td>Frosinone</td>
        <td>38</td>
        <td>80</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Genoa</td>
        <td>38</td>
        <td>73</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Bari</td>
        <td>38</td>
        <td>65</td>
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
