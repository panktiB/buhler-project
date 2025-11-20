import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const loading = ref(false)
  const error = ref(null)
  const products = ref([])

  const initialize = async () => {
    if (products.value.length === 0) {
      await fetchProducts()
    }
  }

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/mock.json')
      const products = await response.json()
      setProducts(products)
    } catch (err) {
      console.error('Error fetching products:', err)
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const setProducts = (value) => {
    products.value = value
  }

  const getProductById = (id) => {
    return products.value.find((product) => product.id === id)
  }

  const categorizedProducts = computed(() => {
    const categoryMap = {}

    products.value?.forEach((product) => {
      const category = product.category

      if (!categoryMap[category]) {
        categoryMap[category] = {
          name: category,
          label: category.split('_').join(' '),
          products: [],
        }
      }

      categoryMap[category].products.push(product)
    })
    return Object.values(categoryMap)
  })

  return {
    initialize,
    products,
    loading,
    error,
    setProducts,
    getProductById,
    categorizedProducts,
    fetchProducts,
  }
})
