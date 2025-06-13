<script setup lang="ts">
import ErrorIcon from '@/icons/ErrorIcon.vue'
import SuccessIcon from '@/icons/SuccessIcon.vue'
import { useNotificationStore } from '@/stores/notificationStore'

const notificationStore = useNotificationStore()
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300"
    leave-active-class="transition-all duration-300"
    enter-from-class="-translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
    mode="out-in"
  >
    <div
      v-if="notificationStore.show"
      class="z-50 fixed min-w-64 bottom-0 right-0 p-6 m-6 bg-white shadow shadow-gray-400 rounded-lg flex items-center gap-2"
    >
      <ErrorIcon v-if="notificationStore.isError" class="text-red-600" />
      <SuccessIcon v-else class="text-green-600" />
      <p class="text-center text-lg">{{ notificationStore.message }}</p>
    </div>
  </Transition>
</template>
