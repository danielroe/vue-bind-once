<h1 align="center">1️⃣ vue-bind-once</h1>
<p align="center">A tiny, SSR-safe directive for binding random data to an element.</p>

<p align="center">
<a href="https://npmx.dev/package/vue-bind-once">
    <img alt="" src="https://npmx.dev/api/registry/badge/version/vue-bind-once">
</a>
<a href="https://bundlephobia.com/result?p=vue-bind-once">
    <img alt="" src="https://img.shields.io/bundlephobia/minzip/vue-bind-once?style=flat-square">
</a>
<a href="https://npmx.dev/package/vue-bind-once">
    <img alt="" src="https://npmx.dev/api/registry/badge/downloads/vue-bind-once">
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

<!-- prettier-ignore -->
> [!WARNING]
> `vue-bind-once` is deprecated. Vue 3.5 and later ship [`useId()`](https://vuejs.org/api/composition-api-helpers#useid), which generates IDs that are stable across server rendering and hydration.

## Migrating to `useId()`

Replace the directive with a regular binding to an ID from `useId()`:

```html
<script setup>
  import { useId } from 'vue'
  const id = useId()
</script>
<template>
  <input type="text" :id="id" :name="id" />
  <label :for="id" />
</template>
```

Then remove `vue-bind-once` from your dependencies, along with any `BindOncePlugin` or `BindOnceDirective` registration.

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
import { BindOnceDirective, BindOncePlugin } from 'vue-bind-once'
import App from './App.vue'

const app = createApp(App)
app.use(BindOncePlugin)
// or app.directive('bind-once', BindOnceDirective)
```

In most cases you'll be using this directive with an SSR-rendering framework like `nuxt`, which may have a different way for you to register this directive. For example, in a Nuxt plugin:

```js
import { BindOncePlugin } from 'vue-bind-once'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(BindOncePlugin)
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
