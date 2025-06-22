<script setup lang="ts">
import LocationIcon from '@/icons/LocationIcon.vue'
import StarIcon from '@/icons/StarIcon.vue'

defineProps<{
  restaurant: {
    _id: string | number
    images: { secure_url: string; public_id: string }[]
    name: string
    category: string
    location: string
    rating: number
    description: string
    user: { username: string; email: string; role: string }
  }
}>()
</script>

<template>
  <div
    class="flex flex-col w-96 rounded-xl bg-white shadow-md border border-gray-200 overflow-hidden duration-200"
  >
    <img
      :src="restaurant.images[0].secure_url"
      :alt="restaurant.name"
      class="aspect-video object-cover w-full h-56"
    />
    <div class="p-5 flex flex-col gap-3">
      <h2 class="text-xl font-semibold text-gray-900">{{ restaurant.name }}</h2>

      <div class="flex items-center gap-2 text-sm text-gray-600">
        <p class="flex items-center gap-1">
          <LocationIcon class="w-4 h-4 text-gray-500" />
          <span>{{ restaurant.location }}</span>
        </p>
        <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
        <p>{{ restaurant.category }}</p>
      </div>

      <div class="flex items-center gap-1">
        <div v-for="star in 5" :key="star">
          <StarIcon
            :class="star <= Math.round(restaurant.rating) ? 'text-yellow-400' : 'text-gray-300'"
            class="w-5 h-5"
          />
        </div>
        <span v-if="restaurant.rating" class="ml-2 text-sm font-medium text-gray-700">{{
          Number(restaurant.rating.toFixed(1))
        }}</span>
      </div>

      <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
        {{ restaurant.description }}
      </p>

      <RouterLink
        :to="`/restaurant/${restaurant._id}`"
        class="mt-2 bg-black text-white py-2 rounded-md text-sm text-center font-semibold tracking-wide hover:bg-gray-800 transition-colors cursor-pointer"
      >
        See more
      </RouterLink>
    </div>
  </div>
</template>
