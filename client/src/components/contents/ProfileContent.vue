<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useModal } from '@/composables/useModal'
import { changePassword, deactivate } from '@/services/auth'
import { useNotificationStore } from '@/stores/notificationStore'
import { getErrorMessage } from '@/utils/errorHandler'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { currentUser } = useAuth()
const { closeModal } = useModal()
const notificationStore = useNotificationStore()
const router = useRouter()
const deactivateAccountOptions = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const resetForm = () => {
  currentPassword.value = ''
  newPassword.value = ''
  confirmNewPassword.value = ''
}

async function deactivateAccount() {
  try {
    if (currentUser.value?._id !== undefined) {
      const response = await deactivate(currentUser.value._id)
      router.push('/login')
      console.log(response, currentUser.value._id)
    } else {
      throw new Error('User ID is undefined')
    }
  } catch (error) {
    console.error(getErrorMessage(error))
  }
}
async function handleChangePassword() {
  try {
    if (currentUser.value?._id !== undefined) {
      if (newPassword.value === confirmNewPassword.value) {
        const response = await changePassword(
          currentUser.value?._id,
          currentPassword.value,
          newPassword.value,
        )
        notificationStore.notifySuccess(response?.data?.message || 'Password changed successfully')
        resetForm()
        closeModal()
      } else {
        notificationStore.notifyError('New password and confirmation do not match')
        return
      }
    }
  } catch (error) {
    notificationStore.notifyError(getErrorMessage(error))
    console.error(getErrorMessage(error))
  }
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="currentUser">
      <label class="text-sm font-medium text-text">Username</label>
      <input :placeholder="currentUser?.username" class="input px-2" />
    </div>
    <div>
      <label class="text-sm font-medium text-text">Email</label>
      <input class="input px-2" type="email" :placeholder="currentUser?.email" readonly />
    </div>
  </div>
  <div class="space-y-2 border-t pt-4">
    <p class="text-text font-semibold">Change Password</p>
    <input
      type="password"
      v-model="currentPassword"
      placeholder="Current Password"
      class="px-2 input"
    />
    <input type="password" v-model="newPassword" placeholder="New Password" class="px-2 input" />
    <input
      type="password"
      v-model="confirmNewPassword"
      placeholder="Confirm New Password"
      class="input px-2"
    />
    <div class="flex justify-end">
      <button @click="handleChangePassword" class="px-4 button register-button mt-2">
        Save New Password
      </button>
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
      <button
        @click="deactivateAccountOptions = false"
        class="button logout-button w-44 text-white"
      >
        No
      </button>
      <button @click="deactivateAccount" class="button register-button w-44 text-white">Yes</button>
    </div>
  </div>
</template>
