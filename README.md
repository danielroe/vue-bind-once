<h1 align="center">1️⃣ vue-bind-once</h1>
<p align="center">A tiny, SSR-safe directive for binding random data to an element.</p>

<p align="center">
<a href="https://npmjs.com/package/vue-bind-once">
    <img alt="" src="https://img.shields.io/npm/v/vue-bind-once/latest.svg?style=flat-square">
</a>
<a href="https://bundlephobia.com/result?p=vue-bind-once">
    <img alt="" src="https://img.shields.io/bundlephobia/minzip/vue-bind-once?style=flat-square">
</a>
<a href="https://npmjs.com/package/vue-bind-once">
    <img alt="" src="https://img.shields.io/npm/dt/vue-bind-once.svg?style=flat-square">
</a>
<a href="https://lgtm.com/projects/g/danielroe/vue-bind-once">
    <img alt="" src="https://img.shields.io/lgtm/alerts/github/danielroe/vue-bind-once?style=flat-square">
</a>
<a href="https://lgtm.com/projects/g/danielroe/vue-bind-once">
    <img alt="" src="https://img.shields.io/lgtm/grade/javascript/github/danielroe/vue-bind-once?style=flat-square">
</a>
<a href="https://codecov.io/gh/danielroe/vue-bind-once">
    <img alt="" src="https://img.shields.io/codecov/c/github/danielroe/vue-bind-once.svg?style=flat-square">
</a>
</p>

> A tiny, SSR-safe directive for binding random data to an element.

## Quick Start

First install `vue-bind-once`:

```bash
yarn add vue-bind-once

# or npm

npm install vue-bind-once --save
```

### Register directive

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { BindOnceDirective, BindOncePlugin } from 'vue-bind-once'

const app = createApp(App)
app.install(BindOncePlugin)
// or app.directive('bind-once', BindOnceDirective)
```

In most cases you'll be using this directive with an SSR-rendering framework like `nuxt`, which may have a different way for you to register this directive. For example, in a Nuxt plugin:

```js
import { BindOncePlugin } from 'vue-bind-once'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.install(BindOncePlugin)
})
```

### Usage

You can now use the directive on any element where you need a binding to a value that needs to match between client/server but won't change dynamically afterwards.

```html
<script setup>
  import { nanoid } from 'nanoid'
  const id = nanoid()
</script>
<template>
  <input type="text" v-bind-once="{ id, name: id }" />
  <label v-bind-once="{ for: id }" />
</template>
```

This will work on both server and on client re-hydration.

## Contributors

This has been developed to suit my needs but additional use cases and contributions are very welcome.

## License

[MIT License](./LICENSE) - Copyright &copy; Daniel Roe
