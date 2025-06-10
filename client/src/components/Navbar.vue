<script setup>
import UserIcon from '@/icons/UserIcon.vue'
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
      <div class="flex items-center gap-2 cursor-pointer">
        <UserIcon class="text-white" />
        <RouterLink to="/login" class="text-lg text-white">Login</RouterLink>
      </div>
    </div>
  </div>
</template>
