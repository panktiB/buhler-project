<template>
  <v-container>
    <v-row>
      <v-col class="px-0">
        <v-btn
          variant="plain"
          class="text-capitalize px-0 text-secondary"
          prepend-icon="mdi-arrow-left"
          @click="$router.back()"
        >
          Back
        </v-btn>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-if="loading" class="justify-center my-12">
      <v-col cols="auto">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>

    <!-- Error/Not Found State -->
    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert type="error" variant="tonal"> Product not found </v-alert>
      </v-col>
    </v-row>

    <!-- Product Details -->
    <v-row v-else class="border-primary">
      <v-col cols="12" md="3" class="bg-white">
        <v-img :src="product?.imageUrl" :alt="product?.name" height="300" />
      </v-col>
      <v-col class="text-secondary pl-8" cols="12" md="9">
        <v-row>
          <div class="text-h6 font-weight-bold pl-5">{{ product?.name }}</div>
        </v-row>
        <v-row>
          <div class="font-italic pl-5 text-capitalize">
            {{ product?.category.split('_').join(' ') }}
          </div>
        </v-row>
        <v-row>
          <div class="pl-5">x{{ product?.price }}</div>
        </v-row>
        <v-row>
          <v-btn
            variant="text"
            color="secondary"
            prepend-icon="mdi-cart-outline"
            class="text-capitalize"
            @click="addToCart"
          >
            Add to cart
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useProductsStore } from '@/stores/products.js'
import { useCartStore } from '@/stores/cart.js'

const route = useRoute()
const cartStore = useCartStore()

const productId = ref()

const loading = computed(() => productsStore.loading)
const error = computed(() => productsStore.error)

const product = computed(() => productsStore.getProductById(productId.value))

const productsStore = useProductsStore()

onMounted(() => {
  productId.value = route.params.id
  productsStore.initialize()
})

const addToCart = () => {
  cartStore.addProduct(product.value)
}
</script>
