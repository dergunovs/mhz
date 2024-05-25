import { Meta, StoryObj } from '@storybook/vue3';
import { html } from '@/utils';

import { UiSlider } from '@/components';

import slide1 from '@/components/UiSlider/images/1.jpg';
import slide2 from '@/components/UiSlider/images/2.jpg';
import slide3 from '@/components/UiSlider/images/3.jpg';

import thumb1 from '@/components/UiSlider/images/thumb-1.webp';
import thumb2 from '@/components/UiSlider/images/thumb-2.webp';
import thumb3 from '@/components/UiSlider/images/thumb-3.webp';

const meta = {
  component: UiSlider,
  args: {
    slides: [slide1, slide2, slide3],
    thumbs: [thumb1, thumb2, thumb3],
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiSlider>;

const argTypes = {};

type Story = StoryObj<typeof UiSlider>;

export default meta;

export const Primary: Story = {
  render: (args) => ({
    components: { UiSlider },
    setup: () => ({ args, argTypes }),

    template: html` <UiSlider v-bind="args" />`,
  }),
  argTypes,
};
