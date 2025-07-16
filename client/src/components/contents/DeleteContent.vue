<script setup lang="ts">
const props = defineProps<{ item: string }>()
const emit = defineEmits(['cancelDelete', 'confirmDelete'])
</script>

<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-4">
      Are you sure that you want to delete this {{ props.item }}
    </h2>
    <div class="flex justify-end gap-2">
      <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" @click="emit('cancelDelete')">
        Cancel
      </button>
      <button
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        @click="emit('confirmDelete')"
      >
        Delete
      </button>
    </div>
  </div>
</template>
