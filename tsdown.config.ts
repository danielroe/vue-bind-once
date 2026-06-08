import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: { oxc: true },
  exports: { devExports: true },
  format: ['esm', 'cjs'],
  deps: {
    neverBundle: ['vue'],
  },
})
