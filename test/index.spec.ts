import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { createApp, createSSRApp, reactive } from 'vue'
import { renderToString } from 'vue/server-renderer'

import { BindOnceDirective, BindOncePlugin } from '../src'

const sampleRender = '<div id="test-value" num="42" bool="true" camel-case="camel" kebab-case="kebab"></div>'

describe('directive', () => {
  it('does nothing with no binding', () => {
    for (const binding of [undefined, '', false, null, {}]) {
      const wrapper = elementWithDirective(binding as any)
      expect(wrapper.html()).toBe(`<div></div>`)
    }
  })

  it('binds data on client-side', () => {
    const wrapper = elementWithDirective(sampleData())
    expect(wrapper.html()).toBe(sampleRender)
  })

  it('handles reactive data', () => {
    const wrapper = mount(
      {
        template: `<div v-bind-once="boundData"></div>`,
        setup: () => ({ boundData: reactive(sampleData()) }),
      },
      { global: { plugins: [BindOncePlugin] } },
    )
    expect(wrapper.html()).toBe(sampleRender)
  })

  it('adds data-attributes on server-side', async () => {
    const app = createApp({
      template: `<div v-bind-once="boundData"></div>`,
      data: () => ({
        boundData: sampleData(),
      }),
    })
    app.directive('bind-once', BindOnceDirective)
    const result = await renderToString(app)
    expect(result).toBe(sampleRender)
  })

  it('hydrates server-rendered data properly', async () => {
    const body = `<body id="app">${sampleRender}</body>`
    const html = `<html>${body}</html>`
    document.write(html)
    const app = createSSRApp({
      template: `<div v-bind-once="boundData"></div>`,
      data: () => ({
        boundData: Object.fromEntries(
          Object.keys(sampleData()).map(k => [k, Math.random()]),
        ),
      }),
    })
    app.use(BindOncePlugin)
    app.mount('#app')
    expect(document.querySelector('body')!.outerHTML).toBe(body)
  })
})

function sampleData() {
  return {
    'id': 'test-value',
    'num': 42,
    'bool': true,
    'camelCase': 'camel',
    'kebab-case': 'kebab',
  }
}

function elementWithDirective(binding?: Record<string, any>) {
  return mount(
    {
      template:
        binding !== undefined
          ? `<div v-bind-once="${JSON.stringify(binding).replace(
            /"/g,
            '\'',
          )}"></div>`
          : `<div v-bind-once></div>`,
    },
    { global: { plugins: [BindOncePlugin] } },
  )
}
