<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notification from './components/Notification.vue'
import { ref } from 'vue'
import { useAuth } from './composables/useAuth'
import AdminIcon from './icons/AdminIcon.vue'
import AdminSidebar from './components/AdminSidebar.vue'

const isSidebarOpened = ref(false)
const { isAdmin } = useAuth()
</script>

<template>
  <div class="bg-background min-h-screen">
    <button
      v-if="isAdmin"
      @click="isSidebarOpened = !isSidebarOpened"
      class="fixed top-0 left-12 m-4 p-4 bg-sidebar ring-2 ring-ring z-50 rounded-full cursor-pointer"
    >
      <AdminIcon class="text-white" />
    </button>
    <div class="fixed top-24 z-50 duration-300">
      <AdminSidebar v-model:isOpened="isSidebarOpened" />
    </div>
    <RouterView />
    <Notification />
  </div>
</template>
