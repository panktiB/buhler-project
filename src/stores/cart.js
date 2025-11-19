import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('card', () => {
  const products = ref([])
  function addProduct(value) {
    products.value.push(value)
  }

  return { products, addProduct }
})
