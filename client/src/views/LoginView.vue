<script setup lang="ts">
import LockIcon from '@/icons/LockIcon.vue'
import loginBg from '../assets/loginbg.jpg'
import UserIcon from '@/icons/UserIcon.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notificationStore'
import { getErrorMessage } from '@/utils/errorHandler'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const notificationStore = useNotificationStore()
const userStore = useUserStore()

const loginData = reactive({
  username: '',
  password: '',
})

async function handleLogin() {
  try {
    const user = await userStore.loginUser({
      username: loginData.username,
      password: loginData.password,
    })
    notificationStore.notifySuccess(user.message || 'Login successful')
    router.push('/')
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
              class="register-input"
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
              class="register-input"
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
      </form>
    </div>
  </div>
</template>
