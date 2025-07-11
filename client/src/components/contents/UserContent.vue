<script setup lang="ts">
defineProps<{
  user: {
    _id: string
    username: string
    email: string
    role: string
    isActive: boolean
  }
}>()
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-gray-800 border-b pb-2">User details</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
      <div>
        <span class="font-medium text-gray-900">ID:</span>
        <div class="truncate">{{ user._id }}</div>
      </div>
      <div>
        <span class="font-medium text-gray-900">Status:</span>
        <div>
          <span
            :class="[
              'inline-block px-2 py-0.5 rounded-full text-xs font-semibold',
              user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
            ]"
          >
            {{ user.isActive ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </div>
      <div>
        <span class="font-medium text-gray-900">Username:</span>
        <div>{{ user.username }}</div>
      </div>
      <div>
        <span class="font-medium text-gray-900">Email:</span>
        <div>{{ user.email }}</div>
      </div>
      <div>
        <span class="font-medium text-gray-900">Role:</span>
        <div class="capitalize">{{ user.role }}</div>
      </div>
    </div>
  </div>
</template>
