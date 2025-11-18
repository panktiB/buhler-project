<template>
  <v-app>
    <AppNav />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
<script setup>
import AppNav from './components/AppNav.vue'
import { RouterView } from 'vue-router'
</script>
