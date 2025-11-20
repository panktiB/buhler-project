<template>
  <v-app-bar density="compact" class="nav-container" flat>
    <v-row class="px-10">
      <v-col>
        <RouterLink to="/">
          <v-img :src="logo" alt="logo" width="150" height="30"></v-img>
        </RouterLink>
      </v-col>
      <v-col class="text-center text-secondary align-self-center">{{ now }}</v-col>
      <v-col class="text-end text-secondary align-self-center">
        <RouterLink to="/checkout" class="text-secondary text-decoration-none">
          <v-icon size="small">mdi-cart-outline</v-icon>
          <span>Cart</span>
          <span>({{ cartItems.length }})</span>
        </RouterLink>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup>
import logo from '@/assets/buhler-logo.svg'
import { useCartStore } from '@/stores/cart.js'
import { ref, onMounted, onUnmounted, computed } from 'vue'

const now = ref('')

const formatDate = (date) => {
  const options = {
    month: 'short',
    day: '2-digit',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }
  let formatted = new Intl.DateTimeFormat('en-US', options).format(date) // "Nov 18, 25, 6:14:14 PM"

  // Convert spaces → exact style: "Nov/18/25, 6:14:14PM"
  formatted = formatted
    .replace(',', '') // remove first comma
    .replace(' ', '/') // between month and day
    .replace(' ', '/') // between day and year

  return formatted
}

let interval

onMounted(() => {
  now.value = formatDate(new Date())

  interval = setInterval(() => {
    now.value = formatDate(new Date())
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.products)
</script>

<style lang="scss" scoped>
.nav-container {
  background-color: #f3f3f3 !important;
  border-bottom: 1px solid rgb(var(--v-theme-secondary));
}
</style>
