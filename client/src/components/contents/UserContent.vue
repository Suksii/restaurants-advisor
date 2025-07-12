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
    <h2 class="text-2xl font-bold text-text border-b border-border pb-3">User details</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div>
        <span class="font-medium text-text-muted">ID:</span>
        <div class="truncate text-text">{{ user._id }}</div>
      </div>
      <div>
        <span class="font-medium text-text-muted">Status:</span>
        <div>
          <span
            :class="[
              'inline-block px-2 py-0.5 rounded-full text-xs font-semibold',
              user.isActive ? 'text-white bg-success' : 'bg-danger text-white',
            ]"
          >
            {{ user.isActive ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </div>
      <div>
        <span class="font-medium text-text-muted">Username:</span>
        <div class="text-text">{{ user.username }}</div>
      </div>
      <div>
        <span class="font-medium text-text-muted">Email:</span>
        <div class="text-text">{{ user.email }}</div>
      </div>
      <div>
        <span class="font-medium text-text-muted">Role:</span>
        <div class="capitalize">{{ user.role }}</div>
      </div>
    </div>
  </div>
</template>
