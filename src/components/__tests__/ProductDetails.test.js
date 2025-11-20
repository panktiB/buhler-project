import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import ProductDetails from '../ProductDetails.vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
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
]

let router
const renderWrapper = async (productId = '1') => {
  router.push(`/${productId}`)
  await router.isReady()

  const wrapper = mountWithPinia(ProductDetails, {
    global: {
      plugins: [router],
    },
  })

  await flushPromises()
  return wrapper
}

describe('details tests', () => {
  let wrapper
  let productsStore
  let cartStore

  beforeEach(() => {
    setupPinia()
    productsStore = useProductsStore()
    cartStore = useCartStore()

    productsStore.setProducts(mockProducts)

    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/:id', component: ProductDetails },
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

  it('displays back button', async () => {
    wrapper = await renderWrapper()
    const backButton = wrapper.find('button')
    expect(backButton.text()).toContain('Back')
  })

  it('calls initialize on mount', async () => {
    const initializeSpy = vi.spyOn(productsStore, 'initialize')
    wrapper = await renderWrapper()

    expect(initializeSpy).toHaveBeenCalled()
  })

  it('displays all product details', async () => {
    wrapper = await renderWrapper('1')
    const image = wrapper.findComponent({ name: 'VImg' })
    const buttons = wrapper.findAll('button')
    const addToCartButton = buttons.find((btn) => btn.text().includes('Add to cart'))
    expect(wrapper.text()).toContain('Product1')
    expect(wrapper.text()).toContain('x100')
    expect(addToCartButton).toBeDefined()
    expect(wrapper.text()).toContain('category 1')
    expect(image.props('src')).toBe('https://example.com/product1.jpg')
    expect(image.props('alt')).toBe('Product1')
  })

  it('navigates back when back button is clicked', async () => {
    const backSpy = vi.spyOn(router, 'back')
    wrapper = await renderWrapper()
    const backButton = wrapper.find('button')
    await backButton.trigger('click')
    expect(backSpy).toHaveBeenCalled()
  })

  it('adds product to cart when add to cart button is clicked', async () => {
    wrapper = await renderWrapper('1')
    expect(cartStore.products.length).toBe(0)

    const buttons = wrapper.findAll('button')
    const addToCartButton = buttons.find((btn) => btn.text().includes('Add to cart'))
    await addToCartButton.trigger('click')

    expect(cartStore.products.length).toBe(1)
    expect(cartStore.products[0].id).toBe(1)
    expect(cartStore.products[0].name).toBe('Product1')
  })
})
