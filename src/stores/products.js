import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const loading = ref(false)
  const error = ref(null)
  const products = ref([])
  const categorizedProducts = ref([])

  const initialize = async () => {
    if (products.value.length === 0) {
      await fetchProducts()
    }
  }

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('./../../public/mock.json')
      const products = await response.json()
      setProducts(products)
      categorizedProducts.value = getCategorizedProducts()
    } catch (err) {
      console.error('Error fetching products:', error)
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  function setProducts(value) {
    products.value = value
  }

  function getProductById(id) {
    return products.value.find((product) => product.id === id)
  }

  function getCategorizedProducts() {
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
  }

  return {
    initialize,
    products,
    setProducts,
    getProductById,
    categorizedProducts,
    getCategorizedProducts,
    fetchProducts,
  }
})
