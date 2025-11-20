import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import AppCart from '../AppCart.vue'
import { useCartStore } from '@/stores/cart'
import { setupPinia, mountWithPinia, cleanupWrapper } from '@/tests/testUtils'

const mockProduct1 = {
  id: 1,
  name: 'Product 1',
  category: 'category1',
  imageUrl: 'https://example.com/product1.jpg',
  price: 50,
}
const mockProduct2 = {
  id: 2,
  name: 'Product 2',
  category: 'category2',
  imageUrl: 'https://example.com/product2.jpg',
  price: 30,
}
const mockProduct3 = {
  id: 3,
  name: 'Product 3',
  category: 'https://example.com/product3.jpg',
  imageUrl: 'url3',
  price: 80,
}

describe('AppCart.vue', () => {
  let wrapper

  beforeEach(() => {
    setupPinia()
  })

  afterEach(() => {
    cleanupWrapper(wrapper)
  })

  it('renders correct base information with empty card', () => {
    wrapper = mountWithPinia(AppCart)
    expect(wrapper.text()).toContain('Checkout')
    expect(wrapper.text()).toContain('Total: x0')
  })

  it('displays cart items correctly', () => {
    const cartStore = useCartStore()
    cartStore.addProduct(mockProduct1)
    cartStore.addProduct(mockProduct2)
    wrapper = mountWithPinia(AppCart)
    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).toContain('Product 2')
    expect(wrapper.text()).toContain('category1')
    expect(wrapper.text()).toContain('category2')
    expect(wrapper.text()).toContain('x50')
    expect(wrapper.text()).toContain('x30')
  })

  it('renders correct number of items', () => {
    const cartStore = useCartStore()
    cartStore.addProduct(mockProduct1)
    cartStore.addProduct(mockProduct2)
    cartStore.addProduct(mockProduct3)

    wrapper = mountWithPinia(AppCart)
    const images = wrapper.findAllComponents({ name: 'VImg' })
    expect(images.length).toBe(3)
  })

  it('renders product image with correct src', () => {
    const cartStore = useCartStore()
    cartStore.addProduct(mockProduct2)

    wrapper = mountWithPinia(AppCart)
    const images = wrapper.findAllComponents({ name: 'VImg' })
    expect(images.length).toBeGreaterThan(0)
    expect(images[0].props('src')).toBe('https://example.com/product2.jpg')
  })

  it('calculates total price correctly', () => {
    const cartStore = useCartStore()
    cartStore.addProduct(mockProduct2)
    cartStore.addProduct(mockProduct3)

    wrapper = mountWithPinia(AppCart)
    expect(wrapper.text()).toContain('Total: x110')
  })

  it('removes item from cart when close button is clicked', async () => {
    const cartStore = useCartStore()
    cartStore.addProduct(mockProduct1)
    cartStore.addProduct(mockProduct2)

    wrapper = mountWithPinia(AppCart)

    expect(cartStore.products.length).toBe(2)

    const buttons = wrapper.findAllComponents({ name: 'VBtn' })
    const closeButton = buttons.filter((btn) => btn.props('icon') === 'mdi-close')[0]

    await closeButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(cartStore.products.length).toBe(1)
  })

  it('updates total price after removing an item', async () => {
    const cartStore = useCartStore()
    cartStore.addProduct(mockProduct1)
    cartStore.addProduct(mockProduct3)

    wrapper = mountWithPinia(AppCart)
    expect(wrapper.text()).toContain('Total: x130')

    const buttons = wrapper.findAllComponents({ name: 'VBtn' })
    const closeButton = buttons.filter((btn) => btn.props('icon') === 'mdi-close')[0]

    await closeButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Total: x80')
  })
})
