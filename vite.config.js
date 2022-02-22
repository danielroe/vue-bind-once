/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      include: ['src'],
      reporter: ['text', 'json', 'html'],
    },
  },
})
