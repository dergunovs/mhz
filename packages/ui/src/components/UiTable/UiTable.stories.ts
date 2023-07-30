import { Meta, StoryObj } from '@storybook/vue3';
import { html } from '@/utils';

import { UiTable } from '@/components';

const meta = {
  component: UiTable,
  args: {
    headers: ['Position', 'Team', 'Games', 'Points'],
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiTable>;

const argTypes = {};

type Story = StoryObj<typeof UiTable>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes }) => ({
    components: { UiTable },
    setup: () => ({ args, argTypes }),

    template: html` <UiTable v-bind="args">
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
  }),
  argTypes,
};
