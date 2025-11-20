import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '@/stores/products'

/* eslint-disable no-undef */
global.fetch = vi.fn()

describe('products store tests', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useProductsStore()
    fetch.mockReset()
  })

  it('initial state is empty', () => {
    expect(store.products).toEqual([])
    expect(store.categorizedProducts).toEqual([])
  })

  it('setProducts updates products value', () => {
    const mockProducts = [
      { id: 1, name: 'product1', category: 'category1' },
      { id: 2, name: 'product2', category: 'category2' },
    ]
    store.setProducts(mockProducts)
    expect(store.products).toEqual(mockProducts)
  })

  it('getProductById returns correct product', () => {
    const mockProducts = [
      { id: 1, name: 'product1', category: 'category1' },
      { id: 2, name: 'product2', category: 'category2' },
    ]
    store.setProducts(mockProducts)
    expect(store.getProductById(2)).toEqual(mockProducts[1])
    expect(store.getProductById(999)).toBeUndefined()
  })

  it('categorizedProducts is exactly grouped categories', () => {
    const mockProducts = [
      { id: 1, name: 'product1', category: 'category1' },
      { id: 2, name: 'product2', category: 'category1' },
      { id: 3, name: 'product3', category: 'category2' },
    ]
    store.setProducts(mockProducts)
    expect(store.categorizedProducts).toEqual([
      {
        name: 'category1',
        label: 'category1',
        products: [
          { id: 1, name: 'product1', category: 'category1' },
          { id: 2, name: 'product2', category: 'category1' },
        ],
      },
      {
        name: 'category2',
        label: 'category2',
        products: [{ id: 3, name: 'product3', category: 'category2' }],
      },
    ])
  })

  it('fetchProducts fetches from mock.json and updates store', async () => {
    const mockResponse = [{ id: 1, name: 'product1', category: 'category1' }]
    fetch.mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    })

    await store.fetchProducts()

    expect(fetch).toHaveBeenCalledOnce()
    expect(store.products).toEqual(mockResponse)
    expect(store.categorizedProducts.length).toBe(1)
    expect(store.categorizedProducts[0].products.length).toBe(1)
  })

  it('initialize calls fetchProducts when products are empty', async () => {
    const mockResponse = [{ id: 1, name: 'product1', category: 'category1' }]
    fetch.mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    })

    await store.initialize()

    expect(fetch).toHaveBeenCalledOnce()
    expect(store.products.length).toBe(1)
  })

  it('initialize does not fetch when products exist', async () => {
    store.setProducts([{ id: 1, name: 'product1', category: 'category1' }])
    await store.initialize()
    expect(fetch).not.toHaveBeenCalled()
  })
})
