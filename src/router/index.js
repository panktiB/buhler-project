import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/components/ProductList.vue'
import AppCart from '@/components/AppCart.vue'
import ProductDetails from '@/components/ProductDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList,
    },
    {
      path: '/:id',
      name: 'product-details',
      component: ProductDetails,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: AppCart,
    },
  ],
})

export default router
