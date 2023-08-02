import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],

  docs: { autodocs: true },

  framework: { name: '@storybook/vue3-vite', options: {} },

  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
};

export default config;
