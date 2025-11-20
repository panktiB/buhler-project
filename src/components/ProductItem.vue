<template>
  <v-card variant="outlined" class="product-wrapper" :aria-label="`View ${product.name} details`">
    <v-img :src="product.imageUrl" :alt="product.name" height="150" cover />
    <v-card-text class="content text-secondary">
      <v-row class="font-weight-bold">
        <v-tooltip :text="product.name" location="top">
          <template v-slot:activator="{ props }">
            <v-col v-bind="props" class="text-truncate">{{ product.name }}</v-col>
          </template>
        </v-tooltip>
      </v-row>
      <v-row>
        <v-col>x{{ product.price }}</v-col>
        <v-col class="text-end">
          <v-icon
            size="small"
            :aria-label="`Add ${product.name} to cart`"
            @click.stop="handleClick"
          >
            mdi-cart-outline
          </v-icon>
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
    validator: (value) => {
      return (
        value &&
        typeof value.id !== 'undefined' &&
        typeof value.name === 'string' &&
        typeof value.price === 'number' &&
        typeof value.imageUrl === 'string'
      )
    },
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
