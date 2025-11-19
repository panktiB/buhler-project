import { beforeEach, describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../cart'

describe('cart store tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with an empty products array', () => {
    const store = useCartStore()
    expect(store.products).toEqual([])
  })

  it('adds products to the cart', () => {
    const store = useCartStore()
    const product = { id: 1, name: 'product1' }
    store.addProduct(product)
    expect(store.products.length).toBe(1)
    expect(store.products[0]).toEqual(product)
  })

  it('adds multiple products to cart', () => {
    const store = useCartStore()
    store.addProduct({ id: 1 })
    store.addProduct({ id: 2 })
    expect(store.products.length).toBe(2)
    expect(store.products.map((p) => p.id)).toEqual([1, 2])
  })

  it('removes a product by id', () => {
    const store = useCartStore()
    store.addProduct({ id: 1 })
    store.addProduct({ id: 2 })
    store.removeProduct(1)
    expect(store.products.length).toBe(1)
    expect(store.products[0].id).toBe(2)
  })
})
