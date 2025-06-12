<script setup lang="ts">
import LockIcon from '@/icons/LockIcon.vue'
import registerBg from '../assets/restaurant-bg.jpeg'
import UserIcon from '@/icons/UserIcon.vue'
import MailIcon from '@/icons/MailIcon.vue'
import axios from 'axios'
import { reactive } from 'vue'
import type { RegisterData } from '@/utils/types'

const userData: RegisterData = reactive({
  username: '',
  email: '',
  password: '',
})

async function register(): Promise<void> {
  try {
    const response = await axios.post('http://localhost:3000/api/users/register', {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })
    console.log(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data?.message)
    } else {
      console.error('An unexpected error occurred:', error)
    }
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
      <form class="flex flex-col gap-6" @submit.prevent="register">
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
              class="register-input"
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
              v-model="userData.password"
              class="register-input"
            />
          </div>
        </div>
        <button type="submit" class="register-button">Register</button>
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
