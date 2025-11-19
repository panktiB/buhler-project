<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="2">
        <ProductItem :product="product" @click="handleClick(product.id)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useProductsStore } from '@/stores/products.js'
import ProductItem from './ProductItem.vue'
import { useRouter } from 'vue-router'

const productsStore = useProductsStore()

const router = useRouter()

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
  if (productsStore.products.length === 0) {
    fetchProducts()
  }
})

const handleClick = (id) => {
  router.push(`/${id}`)
}
</script>
