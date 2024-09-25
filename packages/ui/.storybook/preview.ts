import { StoryObj } from '@storybook/vue3';

import '@/assets/styles/main.scss';

window['IS_STORYBOOK'] = true;

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (story: StoryObj) => ({
    components: { story },
    template: `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:16px;padding:16px;">
      <story :key="Math.random()" />
      </div>`,
  }),
];
