import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import AppNav from '../AppNav.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { setupPinia, mountWithPinia, cleanupWrapper } from '@/tests/testUtils'
import { flushPromises } from '@vue/test-utils'

const mockProducts = [
  {
    id: 1,
    name: 'Product1',
    price: 100,
    imageUrl: 'https://example.com/product1.jpg',
    category: 'category_1',
  },
  {
    id: 2,
    name: 'Product2',
    price: 200,
    imageUrl: 'https://example.com/product2.jpg',
    category: 'category_2',
  },
]

vi.mock('@/assets/buhler-logo.svg', () => ({
  default: 'test-logo.svg',
}))

let router
const renderWrapper = async () => {
  const wrapper = mountWithPinia(AppNav, {
    global: {
      plugins: [router],
      stubs: {
        'v-app-bar': { template: '<div><slot /></div>' },
        'v-row': { template: '<div><slot /></div>' },
        'v-col': { template: '<div><slot /></div>' },
        'v-img': { template: '<div><slot /></div>' },
        'v-icon': true,
      },
    },
  })

  await flushPromises()
  return wrapper
}

describe('tests for navbar', () => {
  let wrapper
  let cartStore

  beforeEach(async () => {
    vi.useFakeTimers()

    const fixedDate = new Date('2025-11-20T12:34:56')
    vi.setSystemTime(fixedDate)

    setupPinia()
    cartStore = useCartStore()

    // Mock initial cart items
    cartStore.addProduct(mockProducts[0])
    cartStore.addProduct(mockProducts[1])

    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/checkout', component: { template: '<div>Checkout</div>' } },
      ],
    })
  })

  afterEach(() => {
    cleanupWrapper()
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('renders logo image correctly', async () => {
    wrapper = await renderWrapper()
    const img = wrapper.find('[src="test-logo.svg"]')
    expect(img.exists()).toBe(true)
  })

  it('contains link to home page', async () => {
    wrapper = await renderWrapper()
    const link = wrapper.find('a[href="/"]')
    expect(link.exists()).toBe(true)
  })

  it('displays correct cart count', async () => {
    wrapper = await renderWrapper()
    expect(wrapper.text()).toContain('(2)')
  })

  it('contains link to checkout page', async () => {
    wrapper = await renderWrapper()
    const link = wrapper.find('a[href="/checkout"]')
    expect(link.exists()).toBe(true)
  })

  it('updates cart count reactively', async () => {
    wrapper = await renderWrapper()
    cartStore.addProduct(mockProducts[1])
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('(3)')
  })

  it('formats and displays time immediately on mount', async () => {
    wrapper = await renderWrapper()
    expect(wrapper.text()).toContain('Nov/20/25,12:34:56 PM')
  })

  it('updates time every second', async () => {
    wrapper = await renderWrapper()
    const first = wrapper.text()
    vi.advanceTimersByTime(1000)
    await flushPromises()
    await wrapper.vm.$nextTick()
    const second = wrapper.text()
    expect(first).not.toBe(second)
  })
})
