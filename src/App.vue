<template>
  <v-app class="app-container">
    <AppNav />
    <v-main class="content-wrapper pt-0">
      <RouterView />
    </v-main>
  </v-app>
</template>
<script setup>
import AppNav from './components/AppNav.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.app-container {
  background-color: #f3f3f3;
}
.content-wrapper {
  margin-top: 54px; // 54px is the height of the app nav bar
  height: calc(100vh - 54px);
  max-height: calc(100vh - 54px);
  overflow-y: auto;
}
</style>
