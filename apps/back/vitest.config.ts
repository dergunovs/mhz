import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    cache: false,
    clearMocks: true,
    include: ['**/*.spec.ts'],
  },
});
