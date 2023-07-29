import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';
import { html } from '@/utils';

import { UiUpload } from '@/components';

let files: File[] = [];
let file;

const meta = {
  component: UiUpload,
  args: {
    label: 'Заголовок',
    files,
    file,
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

    template: html` <UiUpload v-bind="args" @remove="remove($event)" @add="add($event)" /> `,

    methods: {
      remove(fileToRemove: File) {
        const newFiles = files.filter((file: File) => file.name !== fileToRemove.name);

        updateArgs({ files: [...newFiles] });
        files = [...newFiles];
      },

      add(file: File) {
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
export const SingleFile: Story = {
  render: (args, { argTypes, updateArgs }) => ({
    components: { UiUpload },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <UiUpload v-bind="args" isSingle @remove="remove($event)" @add="add($event)" /> `,

    methods: {
      remove() {
        updateArgs({ file: undefined });
        file = undefined;
      },

      add(fileToAdd: File) {
        updateArgs({ file: fileToAdd });
        file = fileToAdd;
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
