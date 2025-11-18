import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  function setProducts(products) {
    products.value = products
  }

  return { products, setProducts }
})
