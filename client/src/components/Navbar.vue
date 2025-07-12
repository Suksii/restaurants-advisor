<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useModal } from '@/composables/useModal'
import UserIcon from '@/icons/UserIcon.vue'
import { useUserStore } from '@/stores/userStore'
import Modal from './Modal.vue'
import ProfileContent from './contents/ProfileContent.vue'

const userStore = useUserStore()
const { showModal, openModal, closeModal } = useModal()

const { currentUser, isLoggedIn, isUser, isAdmin, isGuest } = useAuth()
</script>

<template>
  <div class="bg-navbar flex items-center justify-between px-12">
    <div>
      <img src="../assets/restaurant-logo.png" class="w-28 h-28" />
    </div>
    <div class="flex justify-center items-center gap-12">
      <p v-if="isLoggedIn" class="text-gray-300">
        Welcome,
        <span
          class="font-medium text-primary hover:text-primary-hover underline cursor-pointer hover:text-navbar-hover duration-200"
          @click="openModal('profile')"
        >
          {{ currentUser?.username }}
        </span>
      </p>
      <RouterLink
        to="/"
        class="text-primary text-lg cursor-pointer hover:text-primary-hover duration-300"
        >Home</RouterLink
      >
      <RouterLink
        v-if="isLoggedIn"
        to="/login"
        @click="userStore.logoutUser"
        class="flex items-center gap-2 px-4 py-2 bg-danger hover:bg-danger-hover rounded-lg transition duration-200"
      >
        <UserIcon class="w-5 h-5 text-white" />
        <span class="text-white font-medium">Sign out</span>
      </RouterLink>
      <div v-else class="flex gap-6 items-center">
        <RouterLink to="/register" class="button register-button px-4 text-nowrap"
          >Sign up</RouterLink
        ><RouterLink to="/login" class="button register-button px-4 text-nowrap"
          >Sign in</RouterLink
        >
      </div>
    </div>
  </div>

  <Modal v-if="showModal === 'profile'" title="Your profile" @close="closeModal">
    <ProfileContent />
  </Modal>
</template>
