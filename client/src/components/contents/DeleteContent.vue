<script setup lang="ts">
const props = defineProps<{ item: string }>()
const emit = defineEmits(['cancelDelete', 'confirmDelete'])
</script>

<template>
  <div class="">
    <h2 class="text-lg py-6">
      Are you sure that you want to delete <b>{{ props.item }}</b
      >?
    </h2>
    <div class="flex justify-end gap-2">
      <button class="button px-4 bg-secondary text-white" @click="emit('cancelDelete')">
        Cancel
      </button>
      <button class="button logout-button px-4 text-white" @click="emit('confirmDelete')">
        Delete
      </button>
    </div>
  </div>
</template>
