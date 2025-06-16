import { getCurrentUser, login, logout, register } from '@/services/auth'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
  }),
  actions: {
    async registerUser(credentials: { username: string; email: string; password: string }) {
      const user = await register(credentials)
      this.currentUser = user
      return user
    },
    async loginUser(credentials: { username: string; password: string }) {
      const user = await login(credentials)
      this.currentUser = user
      return user
    },
    async CurrentUser() {
      const user = await getCurrentUser()
      this.currentUser = user
    },
    async logoutUser() {
      await logout()
      this.currentUser = null
    },
  },
})
