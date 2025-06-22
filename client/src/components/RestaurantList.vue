<script setup lang="ts">
import { onMounted } from 'vue'
import RestaurantCard from './RestaurantCard.vue'
import { useRestaurantStore } from '@/stores/restaurantStore'
import { storeToRefs } from 'pinia'

const restaurantStore = useRestaurantStore()
const { restaurants } = storeToRefs(restaurantStore)

onMounted(async () => {
  try {
    await restaurantStore.getRestaurants()
    console.log(restaurants.value)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <div v-for="restaurant of restaurants" :key="restaurant._id">
      <RestaurantCard :restaurant="restaurant" />
    </div>
  </div>
</template>
