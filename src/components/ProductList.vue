<template>
  <v-container>
    <v-row v-if="loading" class="justify-center">
      <v-col cols="auto">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>
    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-else-if="categorizedProducts.length > 0">
      <v-col v-for="category in categorizedProducts" :key="category.name" cols="12">
        <div class="text-capitalize font-weight-bold text-secondary mb-3 category-title">
          {{ category.label }}
        </div>
        <v-row dense>
          <v-col
            v-for="product in category.products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="2"
            class="product-item-wrapper"
          >
            <ProductItem :product="product" @click="handleClick(product.id)" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="text-center text-secondary"> No products available </v-col>
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

const loading = computed(() => productsStore.loading)
const error = computed(() => productsStore.error)
const categorizedProducts = computed(() => productsStore.categorizedProducts)

onMounted(() => {
  productsStore.initialize()
})

const handleClick = (id) => {
  router.push(`/${id}`)
}
</script>
