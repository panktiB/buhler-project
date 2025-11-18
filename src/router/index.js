import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/components/ProductList.vue'
import AppCart from '@/components/AppCart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: AppCart,
    },
  ],
})

export default router
