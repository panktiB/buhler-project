import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import ProductItem from '../ProductItem.vue'
import { useCartStore } from '@/stores/cart'
import { setupPinia, mountWithPinia, cleanupWrapper } from '@/tests/testUtils'

const mockProduct = {
  id: 1,
  name: 'Product1',
  price: 100,
  imageUrl: 'https://example.com/product.jpg',
  category: 'category1',
}

const renderWrapper = (product = mockProduct) => {
  return mountWithPinia(ProductItem, {
    props: {
      product,
    },
  })
}

describe('ProductItem.vue', () => {
  let wrapper
  let cartStore

  beforeEach(() => {
    setupPinia()
    cartStore = useCartStore()
  })

  afterEach(() => {
    cleanupWrapper(wrapper)
  })

  it('renders without errors', () => {
    wrapper = renderWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('displays name, price, image', () => {
    wrapper = renderWrapper()
    const image = wrapper.findComponent({ name: 'VImg' })
    expect(wrapper.text()).toContain('Product1')
    expect(wrapper.text()).toContain('x100')
    expect(image.exists()).toBe(true)
    expect(image.props('src')).toBe('https://example.com/product.jpg')
    expect(image.props('alt')).toBe('Product1')
  })

  it('emits click event when card is clicked', async () => {
    wrapper = renderWrapper()
    const card = wrapper.findComponent({ name: 'VCard' })
    await card.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('cart icon is clickable', async () => {
    wrapper = renderWrapper()
    const icon = wrapper.findComponent({ name: 'VIcon' })
    expect(icon.exists()).toBe(true)
  })

  it('adds products to cart when cart icon is clicked', async () => {
    wrapper = renderWrapper()
    expect(cartStore.products.length).toBe(0)
    const cartButton = wrapper.find('[aria-label="Add Product1 to cart"]')
    await cartButton.trigger('click')
    expect(cartStore.products.length).toBe(1)
    expect(cartStore.products[0]).toEqual(mockProduct)
    await cartButton.trigger('click')
    expect(cartStore.products.length).toBe(2)
  })
})
