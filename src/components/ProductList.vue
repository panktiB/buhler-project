<template>
  <v-container>
    <v-row v-for="category in categorizedProducts" :key="category.name">
      <v-col cols="12">
        <div class="text-capitalize font-weight-bold text-secondary">{{ category.label }}</div>
        <v-row>
          <v-col v-for="product in category.products" :key="product.id" cols="2">
            <ProductItem :product="product" @click="handleClick(product.id)" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useProductsStore } from '@/stores/products.js'
import ProductItem from './ProductItem.vue'
import { useRouter } from 'vue-router'

const productsStore = useProductsStore()

const router = useRouter()

const products = computed(() => productsStore.products)

const categorizedProducts = computed(() => productsStore.categorizedProducts)

const fetchProducts = async () => {
  try {
    const response = await fetch('./../../public/mock.json')
    const products = await response.json()
    productsStore.setProducts(products)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
  productsStore.getCategorizedProducts()
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
