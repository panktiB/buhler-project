import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('card', () => {
  const products = ref([])
  function addProduct(value) {
    products.value.push(value)
  }

  function removeProduct(id) {
    const index = products.value.findIndex((product) => product.id === id)
    if (index !== -1) {
      products.value.splice(index, 1)
    }
  }

  return { products, addProduct, removeProduct }
})
