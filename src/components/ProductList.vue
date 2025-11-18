<template>
  <div class="text-secondary">Product List Component</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useProductsStore } from '@/stores/products.js'

const productsStore = useProductsStore()

const fetchProducts = async () => {
  try {
    const response = await fetch('./../../public/mock.json')
    const products = await response.json()
    productsStore.setProducts(products)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(() => {
  if(productsStore.products.length === 0) {
    fetchProducts()
  }
})

</script>
