<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="2"
      >
        {{product.name}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useProductsStore } from '@/stores/products.js'

const productsStore = useProductsStore()

const products = computed(() => productsStore.products)

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
