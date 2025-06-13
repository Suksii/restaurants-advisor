import { getCurrentUser } from '@/services/auth'
import { createRouter, createWebHistory } from 'vue-router'

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
  ],
})
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  try {
    await getCurrentUser()

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
