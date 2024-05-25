import { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';

import { LABEL } from './constants';

import { html } from '@/utils';
import { UiUpload } from '@/components';

let files: File[] = [];
let file: File | undefined;

const meta = {
  component: UiUpload,
  args: {
    label: LABEL,
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
    options: ['primary', 'secondary'],
  },
  files: { description: 'File[]' },
};

type Story = StoryObj<typeof UiUpload>;

export default meta;

export const Primary: Story = {
  render: (args, { updateArgs }) => ({
    components: { UiUpload },
    setup: () => ({ args, argTypes, updateArgs }),

    template: html` <UiUpload v-bind="args" @remove="remove($event)" @add="add($event)" /> `,

    methods: {
      remove(fileToRemove: File) {
        const newFiles = files.filter((fileExisting: File) => fileExisting.name !== fileToRemove.name);

        updateArgs({ files: [...newFiles] });
        files = [...newFiles];
      },

      add(fileToAdd: File) {
        updateArgs({ files: [...files, fileToAdd] });
        files = [...files, fileToAdd];
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
  render: (args, { updateArgs }) => ({
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
