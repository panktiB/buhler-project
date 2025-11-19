<template>
  <v-card variant="outlined" class="product-wrapper">
    <v-img :src="product.imageUrl" height="150" />
    <v-card-text class="content text-secondary">
      <v-row class="font-weight-bold">
        <v-col>{{ product.name }}</v-col>
      </v-row>
      <v-row>
        <v-col>x{{ product.price }}</v-col>
        <v-col class="text-end">
          <v-icon size="small" @click.stop="handleClick">mdi-cart-outline</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js'
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

const handleClick = () => {
  cartStore.addProduct(props.product)
}
</script>

<style scoped lang="scss">
.product-wrapper {
  border: 2px solid #dadada;
  &:hover {
    cursor: pointer;
    border: 2px solid rgb(var(--v-theme-secondary));
  }
}

.content {
  background-color: #dadada;
}
</style>
