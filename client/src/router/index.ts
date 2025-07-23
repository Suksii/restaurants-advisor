import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/add-restaurant',
      name: 'addRestaurant',
      component: () => import('../components/contents/AddRestaurant.vue'),
    },

    {
      path: '/update-restaurant/:id',
      name: 'updateRestaurant',
      component: () => import('../components/contents/AddRestaurant.vue'),
    },
    {
      path: '/restaurant/:id',
      name: 'restaurant',
      component: () => import('../views/RestaurantView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersTableView.vue'),
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: () => import('../views/RestaurantsTableView.vue'),
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  try {
    await userStore.fetchCurrentUser()
    if (requiresGuest) {
      return next('/')
    }

    next()
  } catch (error) {
    if (requiresAuth) {
      return next('/login')
    }

    next()
  }
})

export default router
