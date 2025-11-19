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
  height: calc(100vh - 54px);
  max-height: calc(100vh - 54px);
  overflow-y: auto;
}
</style>
