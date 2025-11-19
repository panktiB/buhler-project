<template>
  <v-app>
    <AppNav />
    <v-main class="content-wrapper">
      <RouterView />
    </v-main>
  </v-app>
</template>
<script setup>
import AppNav from './components/AppNav.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.content-wrapper {
  margin-top: 54px; // 54px is the height of the app nav bar
  height: calc(100vh - 54px);
  max-height: calc(100vh - 54px);
  overflow-y: auto;
}
</style>
