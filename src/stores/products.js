import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  function setProducts(value) {
    products.value = value
  }

  function getProductById(id) {
    return products.value.find((product) => product.id === id)
  }

  return { products, setProducts, getProductById }
})
