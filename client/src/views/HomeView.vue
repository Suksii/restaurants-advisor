<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import bgImage from '@/assets/restaurant-bg.jpeg'
import SearchIcon from '@/icons/SearchIcon.vue'
import CloseIcon from '@/icons/CloseIcon.vue'
import RestaurantList from '@/components/RestaurantList.vue'
import AdminIcon from '@/icons/AdminIcon.vue'
import { ref } from 'vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import { useAuth } from '@/composables/useAuth'

const isSidebarOpened = ref(false)
const { isAdmin } = useAuth()
</script>

<template>
  <button
    v-if="isAdmin"
    @click="isSidebarOpened = !isSidebarOpened"
    class="fixed top-0 left-12 m-4 p-4 bg-blue-950 ring-2 ring-white z-50 rounded-full cursor-pointer"
  >
    <AdminIcon class="text-white" />
  </button>
  <div class="fixed top-24 z-50 duration-300">
    <AdminSidebar :isOpened="isSidebarOpened" />
  </div>
  <div
    :style="{ backgroundImage: `url(${bgImage})` }"
    class="h-[700px] bg-center bg-cover bg-no-repeat relative"
  >
    <div class="absolute inset-0 bg-black/60"></div>

    <div class="container mx-auto pt-12 relative z-10">
      <Navbar />
    </div>
    <div class="flex flex-col items-center justify-center h-[400px] relative gap-12">
      <p class="text-center text-3xl text-white">
        Find the best restaurants <br />
        in your city
      </p>
      <div class="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a restaurant..."
          class="w-full py-3 px-12 rounded-full bg-white/90 text-gray-900 placeholder:text-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
        <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <CloseIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
      </div>
    </div>
  </div>
  <div class="flex justify-center m-24">
    <!-- <RestaurantCard :restaurant="restaurant" /> -->
    <RestaurantList />
  </div>
</template>
