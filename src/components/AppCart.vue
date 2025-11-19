<template>
  <v-container>
    <v-row v-for="item in items" :key="item.id" class="mb-4">
      <v-col cols="12">
        <div class="">{{item.name}}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js'
import { onMounted, ref, computed } from 'vue'

const cartStore = useCartStore()

const items = computed(() => cartStore.products)
</script>
