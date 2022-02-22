import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { renderToString } from 'vue/server-renderer'
import { createApp, createSSRApp } from 'vue'

import { BindOnceDirective, BindOncePlugin } from '../src'

const fixture = (binding?: Record<string, any>) =>
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
    {
      global: {
        plugins: [BindOncePlugin],
      },
    }
  )

describe('directive', () => {
  it('does nothing with no binding', () => {
    for (const binding of [undefined, '', false, null, {}]) {
      const wrapper = fixture(binding as any)
      expect(wrapper.html()).toBe(`<div></div>`)
    }
  })

  it('binds data on client-side', () => {
    const wrapper = fixture({
      id: 'test-value',
      num: 42,
      bool: true,
      camelCase: 'camel',
    })
    expect(wrapper.html()).toBe(
      `<div id="test-value" num="42" bool="true" camel-case="camel"></div>`
    )
  })

  it('adds data-attributes on server-side', async () => {
    const app = createApp({
      template: `<div v-bind-once="boundData"></div>`,
      data: () => ({
        boundData: {
          id: 'test-value',
          num: 42,
          bool: true,
          camelCase: 'camel',
        },
      }),
    })
    app.directive('bind-once', BindOnceDirective)
    const result = await renderToString(app)
    expect(result).toBe(
      `<div id="test-value" data-id="test-value" num="42" data-num="42" bool="true" data-bool="true" camel-case="camel" data-camel-case="camel"></div>`
    )
  })

  it('hydrates server-rendered data properly', async () => {
    const body = `<body id="app"><div id="test-value" data-id="test-value" num="42" data-num="42" bool="true" data-bool="true" camel-case="camel" data-camel-case="camel"></div></body>`
    const html = `<html>${body}</html>`
    document.write(html)
    const app = createSSRApp({
      template: `<div v-bind-once="boundData"></div>`,
      data: () => ({
        boundData: {
          id: 'some',
          num: 2344,
          bool: false,
          camelCase: 'kebab',
        },
      }),
    })
    app.use(BindOncePlugin)
    app.mount('#app')
    expect(document.documentElement.innerHTML).toBe(body)
  })
})
