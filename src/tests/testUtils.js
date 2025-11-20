import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

let currentPinia = null

export function setupPinia() {
  currentPinia = createPinia()
  setActivePinia(currentPinia)
  return currentPinia
}

export function mountWithPinia(component, options = {}) {
  // Use existing pinia if available, otherwise create new one
  const pinia = currentPinia || setupPinia()

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
  currentPinia = null // Reset for next test
}
