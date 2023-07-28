import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';
import { html } from '@/utils';

import { UiUpload } from '@/components';

let files: File[] = [];

const meta = {
  component: UiUpload,
  args: {
    files,
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} satisfies Meta<typeof UiUpload>;

const argTypes = {
  layout: {
    control: 'select',
    options: ['primary', 'secondary'],
    description: 'primary | secondary',
  },
  files: { description: 'File[]' },
};

type Story = StoryObj<typeof UiUpload>;

export default meta;

export const Primary: Story = {
  render: (args, { argTypes, updateArgs }) => ({
    components: { UiUpload },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <UiUpload v-bind="args" @remove="remove($event)" @update="update($event)" /> `,

    methods: {
      remove(fileToRemove: File) {
        const newFiles = files.filter((file: File) => file.name !== fileToRemove.name);

        updateArgs({ files: [...newFiles] });
        files = [...newFiles];
      },

      update(file: File) {
        updateArgs({ files: [...files, file] });
        files = [...files, file];
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
