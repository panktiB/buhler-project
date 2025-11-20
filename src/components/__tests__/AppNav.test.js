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

describe('AppNav.vue', () => {
  let wrapper
  let cartStore

  beforeEach(async () => {
    vi.useFakeTimers()

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
})
