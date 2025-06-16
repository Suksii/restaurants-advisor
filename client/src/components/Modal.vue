<script setup lang="ts">
import CloseIcon from '@/icons/CloseIcon.vue'
defineProps<{ title?: string }>()
</script>

<template>
  <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-full max-w-lg p-6 space-y-6 relative">
      <h3 v-if="title" class="text-2xl font-medium text-gray-800">{{ title }}</h3>
      <CloseIcon class="absolute right-0 top-0 m-3 cursor-pointer" />
      <slot></slot>
    </div>
  </div>
</template>
