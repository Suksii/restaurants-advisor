<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import UserIcon from '@/icons/UserIcon.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
console.log(userStore.currentUser)

const { currentUser, isLoggedIn, isUser, isAdmin, isGuest } = useAuth()
</script>

<template>
  <div class="bg-black flex items-center justify-between px-12">
    <div>
      <img src="../assets/restaurant-logo.png" class="w-28 h-28" />
    </div>
    <div class="flex justify-center items-center gap-12">
      <p v-if="isLoggedIn" class="text-gray-300">
        Welcome, <span class="font-medium text-white">{{ currentUser?.username }}</span>
      </p>
      <RouterLink
        to="/"
        class="text-white text-lg cursor-pointer hover:text-yellow-500 duration-300"
        >Home</RouterLink
      >
      <RouterLink
        v-if="isLoggedIn"
        to="/login"
        @click="userStore.logoutUser"
        class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-200"
      >
        <UserIcon class="w-5 h-5 text-white" />
        <span class="text-white font-medium">Sign out</span>
      </RouterLink>
      <div v-else class="flex gap-6 items-center">
        <RouterLink to="/register" class="button register-button px-4 text-nowrap">Sign up</RouterLink
        ><RouterLink to="/login" class="button register-button px-4 text-nowrap">Sign in</RouterLink>
      </div>
    </div>
  </div>
</template>
