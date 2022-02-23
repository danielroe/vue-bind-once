import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { renderToString } from 'vue/server-renderer'
import { createApp, createSSRApp, reactive } from 'vue'

import { BindOnceDirective, BindOncePlugin } from '../src'

describe('directive', () => {
  it('does nothing with no binding', () => {
    for (const binding of [undefined, '', false, null, {}]) {
      const wrapper = elementWithDirective(binding as any)
      expect(wrapper.html()).toBe(`<div></div>`)
    }
  })

  it('binds data on client-side', () => {
    const wrapper = elementWithDirective(sampleData())
    expect(wrapper.html()).toBe(
      `<div id="test-value" num="42" bool="true" camel-case="camel" kebab-case="kebab"></div>`
    )
  })

  it('handles reactive data', () => {
    const wrapper = mount(
      {
        template: `<div v-bind-once="boundData"></div>`,
        setup: () => ({ boundData: reactive(sampleData()) }),
      },
      { global: { plugins: [BindOncePlugin] } }
    )
    expect(wrapper.html()).toBe(
      `<div id="test-value" num="42" bool="true" camel-case="camel" kebab-case="kebab"></div>`
    )
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
    expect(result).toBe(
      `<div id="test-value" num="42" bool="true" camel-case="camel" kebab-case="kebab"></div>`
    )
  })

  it('hydrates server-rendered data properly', async () => {
    const body = `<body id="app"><div id="test-value" num="42" bool="true" camel-case="camel" kebab-case="kebab"></div></body>`
    const html = `<html>${body}</html>`
    document.write(html)
    const app = createSSRApp({
      template: `<div v-bind-once="boundData"></div>`,
      data: () => ({
        boundData: Object.fromEntries(
          Object.keys(sampleData()).map(k => [k, Math.random()])
        ),
      }),
    })
    app.use(BindOncePlugin)
    app.mount('#app')
    expect(document.documentElement.innerHTML).toBe(body)
  })
})

const sampleData = () => ({
  id: 'test-value',
  num: 42,
  bool: true,
  camelCase: 'camel',
  'kebab-case': 'kebab',
})

const elementWithDirective = (binding?: Record<string, any>) =>
  mount(
    {
      template:
        binding !== undefined
          ? `<div v-bind-once="${JSON.stringify(binding).replace(
              /"/g,
              "'"
            )}"></div>`
          : `<div v-bind-once></div>`,
    },
    { global: { plugins: [BindOncePlugin] } }
  )
