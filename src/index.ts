import type { Directive, Plugin } from 'vue'
import { kebabCase } from 'scule'

export const BindOnceDirective: Directive<HTMLElement> = {
  created: (el, binding) => {
    for (const key in binding.value) {
      const k = kebabCase(key)
      if (!el.hasAttribute(k)) {
        el.setAttribute(k, binding.value[key])
      }
    }
  },
  getSSRProps(binding) {
    /* c8 ignore next */
    if (!binding.value)
      return {}

    return Object.fromEntries(
      Object.entries(binding.value).map(([key, value]) => [
        kebabCase(key),
        value,
      ]),
    )
  },
}

export const BindOncePlugin: Plugin = {
  install(app) {
    app.directive('bind-once', BindOnceDirective)
  },
}
