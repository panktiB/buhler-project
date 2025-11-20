import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import ProductList from '../ProductList.vue'
import { useProductsStore } from '@/stores/products'
import { setupPinia, mountWithPinia, cleanupWrapper } from '@/tests/testUtils'

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
  {
    id: 3,
    name: 'Product3',
    price: 300,
    imageUrl: 'https://example.com/product3.jpg',
    category: 'category_3',
  },
]

let router
const renderWrapper = async () => {
  const wrapper = mountWithPinia(ProductList, {
    global: {
      plugins: [router],
      stubs: {
        ProductItem: true,
      },
    },
  })

  await flushPromises()
  return wrapper
}

describe('test ProductList', () => {
  let wrapper
  let productsStore

  beforeEach(() => {
    setupPinia()
    productsStore = useProductsStore()

    productsStore.setProducts(mockProducts)

    // Create router
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/:id', component: { template: '<div>Product</div>' } },
      ],
    })
  })

  afterEach(() => {
    cleanupWrapper(wrapper)
    vi.restoreAllMocks()
  })

  it('renders without errors', async () => {
    wrapper = await renderWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('calls initialize on mount', async () => {
    const initializeSpy = vi.spyOn(productsStore, 'initialize')
    wrapper = await renderWrapper()
    expect(initializeSpy).toHaveBeenCalledOnce()
  })

  it('displays correct number of categories', async () => {
    productsStore.setProducts(mockProducts)
    wrapper = await renderWrapper()
    await wrapper.vm.$nextTick()

    const categories = wrapper.findAll('.category-title')
    expect(categories.length).toBe(3)
  })

  it('displays correct number of products', async () => {
    productsStore.setProducts(mockProducts)
    wrapper = await renderWrapper()
    await wrapper.vm.$nextTick()

    const categories = wrapper.findAll('.product-item-wrapper')
    expect(categories.length).toBe(3)
  })

  it('formats category labels correctly', async () => {
    productsStore.setProducts(mockProducts)
    wrapper = await renderWrapper()
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('category 1')
    expect(wrapper.text()).toContain('category 2')
    expect(wrapper.text()).toContain('category 3')
  })

  it('navigates to product detail on click', async () => {
    productsStore.setProducts(mockProducts)
    wrapper = await renderWrapper()
    await wrapper.vm.$nextTick()
    const pushSpy = vi.spyOn(router, 'push')
    const productItem = wrapper.findComponent({ name: 'ProductItem' })
    await productItem.trigger('click')
    expect(pushSpy).toHaveBeenCalledWith('/1')
  })
})
