<script setup lang="ts">
import LockIcon from '@/icons/LockIcon.vue'
import loginBg from '../assets/loginbg.jpg'
import UserIcon from '@/icons/UserIcon.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notificationStore'
import { getErrorMessage } from '@/utils/errorHandler'
import { useUserStore } from '@/stores/userStore'
import { reactivate } from '@/services/auth'

const router = useRouter()
const notificationStore = useNotificationStore()
const userStore = useUserStore()

const loginData = reactive({
  username: '',
  password: '',
})
const isDeactivated = ref(false)
const deactivatedUserId = ref<string | number | null>(null)

async function handleLogin() {
  try {
    const { user, message } = await userStore.loginUser({
      username: loginData.username,
      password: loginData.password,
    })
    console.log(user)

    if (user && user.isActive === false) {
      isDeactivated.value = true
      deactivatedUserId.value = user._id
      notificationStore.notifyError('Your account is deactivated')
      return
    }
    notificationStore.notifySuccess(message || 'Login successful')
    router.push('/')
  } catch (error: any) {
    const errorMessage: string | undefined = getErrorMessage(error)
    const responseUserId = error?.response?.data?.user._id

    if (errorMessage && errorMessage.includes('deactivated')) {
      isDeactivated.value = true
      deactivatedUserId.value = responseUserId
      return
    } else {
      notificationStore.notifyError(getErrorMessage(error))
    }
  }
}
async function handleReactivate() {
  if (!deactivatedUserId.value) {
    notificationStore.notifyError('User ID missing - cannot reactivate account.')
    return
  }
  try {
    await reactivate(deactivatedUserId.value)
    notificationStore.notifySuccess('Account reactivated. Logging you in…')

    isDeactivated.value = false
    deactivatedUserId.value = null
    await handleLogin()
  } catch (error) {
    notificationStore.notifyError(getErrorMessage(error))
    console.error(getErrorMessage(error))
  }
}
</script>

<template>
  <div
    :style="{ backgroundImage: `url('${loginBg}')` }"
    class="w-full min-h-screen bg-cover bg-no-repeat flex items-center justify-center"
  >
    <div class="w-[400px] bg-black/60 backdrop-blur-md rounded-xl p-8 shadow-lg">
      <h2 class="text-white uppercase text-2xl text-center tracking-wider font-semibold mb-6">
        Sign in here
      </h2>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <label class="text-white text-sm">Username</label>
          <div class="relative">
            <UserIcon
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5"
            />
            <input
              type="text"
              placeholder="Enter your username"
              v-model="loginData.username"
              class="register-input pl-10 pr-4"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-white text-sm">Password</label>
          <div class="relative">
            <LockIcon
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5"
            />
            <input
              type="password"
              placeholder="Enter your password"
              v-model="loginData.password"
              class="register-input pl-10 pr-4"
            />
          </div>
        </div>
        <button type="submit" class="mt-4 w-full button register-button">Login</button>
        <p class="text-center text-white/80 text-sm mt-4">
          Don't have an account?
          <RouterLink
            to="/register"
            class="text-yellow-400 hover:underline hover:text-yellow-300 transition"
          >
            Sign up
          </RouterLink>
        </p>
        <div v-if="isDeactivated" class="flex flex-col text-center items-center justify-center">
          <p class="text-red-600 mt-2">Your account is deactivated.</p>
          <button @click="handleReactivate" class="px-2 mt-4 button bg-green-600 text-white">
            Reactivate Account
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
