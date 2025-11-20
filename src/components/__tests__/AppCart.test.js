import { describe, it, expect, afterEach } from 'vitest'
import AppCart from '../AppCart.vue'
import { useCartStore } from '@/stores/cart'
import { setupPinia, mountWithPinia, cleanupWrapper } from '@/tests/testUtils'

describe('AppCart.vue', () => {
  let wrapper

  afterEach(() => {
    cleanupWrapper(wrapper)
  })

  it('renders without errors', () => {
    mountWithPinia(AppCart)
  })

  it('renders checkout title', () => {
    wrapper = mountWithPinia(AppCart)
    expect(wrapper.text()).toContain('Checkout')
  })

  it('displays correct total without any cart items', () => {
    wrapper = mountWithPinia(AppCart)
    expect(wrapper.text()).toContain('Total: x0')
  })


})
