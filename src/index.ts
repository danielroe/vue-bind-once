import { kebabCase } from 'scule'
import type { Directive, Plugin } from 'vue'

export const BindOnceDirective: Directive = {
  created(el, binding) {
    for (const key in binding.value) {
      const k = kebabCase(key)
      el.setAttribute(k, el.dataset[k] || binding.value[key])
    }
  },
  getSSRProps(binding) {
    if (!binding.value) {
      return {}
    }

    return Object.fromEntries(
      Object.entries(binding.value).flatMap(([key, value]) => {
        const k = kebabCase(key)
        return [
          [k, value],
          [`data-${k}`, value],
        ]
      })
    )
  },
}

export const BindOncePlugin: Plugin = {
  install(app) {
    app.directive('bind-once', BindOnceDirective)
  },
}
