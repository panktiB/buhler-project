import { render } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createMemoryHistory } from 'vue-router'
import { vi } from 'vitest'
import VAppWrapper from './VAppWrapper.vue'
import { createRouterConfig } from '@/router'

/**
 * Lightweight test render wrapper for Vuetify + Pinia + Router components.
 * Router is added only if router: true is passed.
 */
export function renderWrapper(
  Component,
  {
    props = {},
    piniaOptions = {},
    router = false,
    global: userGlobal = {},
    ...rest
  } = {}
) {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
    ...piniaOptions
  })

  // Router only if user wants it
  const plugins = [pinia]
  if (router) {
    plugins.push(
      createRouter({
        ...createRouterConfig(),
        history: createMemoryHistory()
      })
    )
  }

  const global = {
    plugins,
    provide: { DEV_MODE: true },
    ...userGlobal
  }

  return render(VAppWrapper, {
    props: { is: Component, ...props },
    global,
    ...rest
  })
}
