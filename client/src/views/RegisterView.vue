<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import registerBg from '../assets/restaurant-bg.jpeg'
import LockIcon from '@/icons/LockIcon.vue'
import UserIcon from '@/icons/UserIcon.vue'
import MailIcon from '@/icons/MailIcon.vue'
import type { RegisterData } from '@/utils/types'
import { getErrorMessage } from '@/utils/errorHandler'
import { useNotificationStore } from '@/stores/notificationStore'
import { useUserStore } from '@/stores/userStore'

const userData: RegisterData = reactive({
  username: '',
  email: '',
  password: '',
})
const router = useRouter()
const notificationStore = useNotificationStore()
const userStore = useUserStore()

async function handleRegister(): Promise<void> {
  try {
    const user = await userStore.registerUser({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })
    notificationStore.notifySuccess(user.message || 'User registered successfully')
    router.push('/login')
  } catch (error) {
    notificationStore.notifyError(getErrorMessage(error))
    console.error(getErrorMessage(error))
  }
}
</script>

<template>
  <div
    :style="{ backgroundImage: `url('${registerBg}')` }"
    class="w-full min-h-screen bg-cover bg-no-repeat flex items-center justify-center"
  >
    <div class="w-[400px] bg-black/60 backdrop-blur-md rounded-xl p-8 shadow-lg">
      <h2 class="text-white uppercase text-2xl text-center tracking-wider font-semibold mb-6">
        Sign up here
      </h2>
      <form class="flex flex-col gap-6" @submit.prevent="handleRegister">
        <div class="flex flex-col gap-1">
          <label class="text-white text-sm">Username</label>
          <div class="relative">
            <UserIcon
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5"
            />
            <input
              type="text"
              placeholder="Enter your username"
              v-model="userData.username"
              class="register-input pl-10 pr-4"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-white text-sm">Email</label>
          <div class="relative">
            <MailIcon
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5"
            />
            <input
              type="email"
              placeholder="Enter your email"
              v-model="userData.email"
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
              v-model="userData.password"
              class="register-input pl-10 pr-4"
            />
          </div>
        </div>
        <button type="submit" class="button register-button">Register</button>
        <p class="text-center text-white/80 text-sm mt-4">
          Already have an account?
          <RouterLink
            to="/login"
            class="text-yellow-400 hover:underline hover:text-yellow-300 transition"
          >
            Sign in
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
