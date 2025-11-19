<template>
  <v-container>
    <v-row>
      <v-btn variant="plain" class="text-capitalize text-secondary" @click="$router.back()">
        Back
      </v-btn>
    </v-row>
    <v-row class="border-primary">
      <v-col cols="3" class="bg-white">
        <v-img :src="product?.imageUrl" height="300" />
      </v-col>
      <v-col class="text-secondary pl-8" cols="9">
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
          <v-btn variant="text" @click.stop="handleClick" class="text-capitalize">
            <v-icon>mdi-cart-outline</v-icon>
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
const product = computed(() => productsStore.getProductById(productId.value))

const productsStore = useProductsStore()

onMounted(() => {
  productId.value = route.params.id
  productsStore.initialize()
})

const handleClick = () => {
  cartStore.addProduct(product.value)
}
</script>
