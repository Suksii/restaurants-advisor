<script setup lang="ts">
import UserIcon from '@/icons/UserIcon.vue'
import { getCurrentUser, logout } from '@/services/auth'
import { onMounted, ref } from 'vue'

const user = ref(null)

onMounted(async () => {
  try {
    const data = await getCurrentUser()
    user.value = data
  } catch (error) {
    user.value = null
  }
})
</script>

<template>
  <div class="bg-black flex items-center justify-between px-12">
    <div>
      <img src="../assets/restaurant-logo.png" class="w-28 h-28" />
    </div>
    <div class="flex justify-center items-center gap-12">
      <RouterLink to="/" class="text-white text-lg cursor-pointer">Home</RouterLink>
      <RouterLink to="/admin/add-restaurant" class="text-white text-lg cursor-pointer"
        >Add restaurant</RouterLink
      >
      <RouterLink
        v-if="user"
        to="/login"
        class="flex items-center gap-2 cursor-pointer"
        @click="logout"
      >
        <UserIcon class="text-white" />
        <p v-if="user" class="text-lg text-white">Logout</p>
      </RouterLink>
    </div>
  </div>
</template>
