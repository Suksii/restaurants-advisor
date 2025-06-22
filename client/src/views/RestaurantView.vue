<script setup lang="ts">
const images = [
  'https://res.cloudinary.com/dubu03per/image/upload/v1750611854/restaurants/lebrs5qbrvvsw24ki0pf.jpg',
  'https://res.cloudinary.com/dubu03per/image/upload/v1750611854/restaurants/lebrs5qbrvvsw24ki0pf.jpg',
  'https://res.cloudinary.com/dubu03per/image/upload/v1750611854/restaurants/lebrs5qbrvvsw24ki0pf.jpg',
  'https://res.cloudinary.com/dubu03per/image/upload/v1750611854/restaurants/lebrs5qbrvvsw24ki0pf.jpg',
]
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-10 space-y-8">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-4xl font-bold mb-2">Ime restorana</h1>
        <p class="text-gray-600">Added by: <span class="font-medium">Unknown user</span></p>
        <p class="text-yellow-500 mt-1">⭐ No ratings yet</p>
      </div>

      <!-- <button @click="" class="text-red-500 hover:text-red-600 transition">
        <HeartIcon :fill="isFavourite ? 'currentColor' : 'none'" class="w-8 h-8" />
      </button> -->
    </div>

    <div class="flex gap-4 overflow-x-auto">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        alt="Restaurant"
        class="w-64 h-48 object-cover rounded shadow"
      />
    </div>

    <div>
      <h2 class="text-xl font-semibold">Description</h2>
      <p class="text-gray-700">Opis restorana</p>
    </div>

    <div>
      <p><strong>Location:</strong>Lokacija restorana</p>
      <p><strong>Category:</strong>Kineski restoran</p>
    </div>
  </div>
</template>
