<template>
  <v-container>
    <v-row class="text-secondary pb-6">
      <div class="font-weight-bold">Checkout</div>
    </v-row>
    <v-row v-for="item in items" :key="item.id" class="mb-4 text-secondary align-center">
      <v-col cols="1">
        <v-img :src="item.imageUrl" :alt="item.name" height="100" cover />
      </v-col>
      <v-col cols="9" class="align-self-center">
        <div class="font-weight-bold">{{ item.name }}</div>
        <div class="text-capitalize font-italic">{{ item.category.split('_').join(' ') }}</div>
      </v-col>
      <v-col cols="2">
        <v-row>
          <v-col>
            <span>x{{ item.price }}</span>
          </v-col>
          <v-col class="justify-end">
            <v-btn
              icon="mdi-close"
              variant="plain"
              density="compact"
              @click="removeFromCart(item.id)"
            ></v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-end text-secondary pb-6">
      <div class="font-weight-bold">Total: x{{ totalPrice }}</div>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js'
import { computed } from 'vue'

const cartStore = useCartStore()

const items = computed(() => cartStore.products)

const removeFromCart = (id) => {
  cartStore.removeProduct(id)
}

const totalPrice = computed(() => {
  return cartStore.products.reduce((total, product) => total + product.price, 0)
})
</script>
