import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'city-list',
      component: () => import('../views/CityList.vue')
    },
    {
      path: '/city',
      name: 'detail-city',
      component: () => import('../views/CityDetail.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/MyProfile.vue')
    }
  ]
})

export default router
