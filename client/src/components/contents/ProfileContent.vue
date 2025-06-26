<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue';

const { currentUser } = useAuth()

const deactivateAccountOptions = ref(false)
</script>

<template>
  <div class="space-y-4">
    <div v-if="currentUser">
      <label class="text-sm font-medium text-gray-700">Username</label>
      <input :placeholder="currentUser?.username" class="input px-2" />
    </div>
    <div>
      <label class="text-sm font-medium text-gray-700">Email</label>
      <input class="input px-2" type="email" :placeholder="currentUser?.email" readonly />
    </div>
  </div>
  <div class="space-y-2 border-t pt-4">
    <p class="text-gray-700 font-semibold">Change Password</p>
    <input type="password" placeholder="Current Password" class="px-2 input" />
    <input type="password" placeholder="New Password" class="px-2 input" />
    <input type="password" placeholder="Confirm New Password" class="input px-2" />
    <div class="flex justify-end">
      <button class="px-4 button register-button mt-2">Save New Password</button>
    </div>
  </div>
  <div class="border-t pt-4">
    <button
      v-if="!deactivateAccountOptions"
      @click="deactivateAccountOptions = true"
      class="button logout-button w-full text-white"
    >
      Deactivate Account
    </button>
    <div v-else class="flex items-center gap-1">
      <p>Are you sure that you want to delete account?</p>
      <button @click="deactivateAccountOptions = false" class="button logout-button w-44 text-white">No</button>
      <button class="button register-button w-44 text-white">Yes</button>
    </div>
  </div>
</template>
