<script setup lang="ts">
defineProps<{
  restaurant: {
    _id: string
    name: string
    category: string
    location: string
    rating: number
    images: { secure_url: string }[]
  }
}>()
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-text border-b border-border pb-3">Restaurant Details</h2>

    <div class="grid grid-cols-2 gap-4 text-gray-700">
      <div>
        <span class="font-semibold text-text-muted">ID:</span>
        <p class="mt-1 text-sm text-text break-words">{{ restaurant._id }}</p>
      </div>
      <div>
        <span class="font-semibold text-text-muted">Name:</span>
        <p class="mt-1 text-text">{{ restaurant.name }}</p>
      </div>
      <div>
        <span class="font-semibold text-text-muted">Category:</span>
        <p class="mt-1 capitalize text-text">{{ restaurant.category }}</p>
      </div>
      <div>
        <span class="font-semibold text-text-muted">Location:</span>
        <p class="mt-1 text-text">{{ restaurant.location }}</p>
      </div>
      <div class="col-span-2">
        <span class="font-semibold text-text-muted">Rating:</span>
        <p class="mt-1 text-yellow-500 font-semibold flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.384 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.615 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"
            />
          </svg>
          <span class="text-text">{{ restaurant.rating }}</span>
        </p>
      </div>
    </div>

    <div>
      <span class="font-semibold block mb-2">Images:</span>
      <div
        class="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-2"
      >
        <img
          v-for="(image, index) in restaurant.images"
          :key="index"
          :src="image.secure_url"
          alt="restaurant image"
          class="w-46 aspect-video object-cover rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
        />
      </div>
    </div>
  </div>
</template>
