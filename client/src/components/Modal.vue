<script setup lang="ts">
import { useModal } from '@/composables/useModal';
import CloseIcon from '@/icons/CloseIcon.vue'
import { Teleport } from 'vue'

defineProps<{ title?: string }>()
const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div
      @click.self="emit('close')"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl w-full max-w-lg mx-2 p-6 space-y-6 relative">
        <h3 v-if="title" class="text-2xl font-medium text-gray-800">{{ title }}</h3>
        <CloseIcon class="absolute right-0 top-0 m-3 cursor-pointer" @click="emit('close')" />
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
