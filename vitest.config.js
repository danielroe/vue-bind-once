import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      include: ['src'],
      reporter: ['text', 'json', 'html'],
    },
  },
})
