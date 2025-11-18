<template>
  <v-app-bar density="compact" class="app-border" flat>
    <v-row class="px-6">
      <v-col><v-img :src="logo" width="150" height="30"></v-img></v-col>
      <v-col class="text-center text-secondary align-self-center">{{ now }}</v-col>
      <v-col class="text-end text-secondary align-self-center">
        <v-icon size="small">mdi-cart-outline</v-icon>
        Cart
        <span>({{ cartItems.length }})</span>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup>
import logo from '@/assets/buhler-logo.svg'

import { ref, onMounted, onUnmounted } from 'vue'

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

  // Convert spaces → your exact style: "Nov/18/25, 6:14:14PM"
  formatted = formatted
    .replace(',', '') // remove first comma
    .replace(' ', '/') // between month and day
    .replace(' ', '/') // between day and year
    .replace(' ', '') // remove space before AM/PM

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

const cartItems = ref([])
</script>

<style lang="scss" scoped>
.app-border {
  border-bottom: 1px solid rgb(var(--v-theme-secondary));
}
</style>
