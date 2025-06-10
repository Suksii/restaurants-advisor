<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import bgImage from '@/assets/restaurant-bg.jpeg'
import SearchIcon from '@/icons/SearchIcon.vue'
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${bgImage})` }"
    class="h-[700px] bg-center bg-cover bg-no-repeat relative"
  >
    <div class="absolute inset-0 bg-black/60"></div>

    <div class="container mx-auto pt-12 relative z-10">
      <Navbar />
    </div>

    <div class="w-full h-full flex justify-center items-center relative z-10">
      <div class="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a restaurant..."
          class="w-full px-5 py-3 pl-12 rounded-full bg-white/90 text-gray-900 placeholder:text-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
        <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  </div>
</template>
