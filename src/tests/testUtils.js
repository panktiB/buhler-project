import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

export function setupPinia() {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

export function mountWithPinia(component, options = {}) {
  const pinia = setupPinia()

  const wrapper = mount(component, {
    global: {
      plugins: [pinia],
      ...options.global,
    },
    ...options,
  })

  return wrapper
}

export function cleanupWrapper(wrapper) {
  if (wrapper) {
    wrapper.unmount()
  }
}
