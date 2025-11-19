import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categorizedProducts = ref([])
  function setProducts(value) {
    products.value = value
  }

  function getProductById(id) {
    return products.value.find((product) => product.id === id)
  }

  function getCategorizedProducts() {
    const categoryMap = {}

    products.value.forEach((product) => {
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
    categorizedProducts.value = Object.values(categoryMap)
    return categorizedProducts.value
  }

  return { products, setProducts, getProductById, categorizedProducts, getCategorizedProducts }
})
