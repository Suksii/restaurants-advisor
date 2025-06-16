import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export function useAuth() {
  const userStore = useUserStore()
  const { currentUser } = storeToRefs(userStore)

  const isLoggedIn = computed(() => !!currentUser.value)
  const isGuest = computed(() => !currentUser.value)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const isUser = computed(() => currentUser.value?.role === 'user')

  return { currentUser, isLoggedIn, isGuest, isAdmin, isUser }
}
