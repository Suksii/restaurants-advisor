<script setup lang="ts">
import { getRestaurantService } from '@/services/restaurant'
import { getErrorMessage } from '@/utils/errorHandler'
import type { Restaurant } from '@/utils/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id as string
const restaurant = ref<Restaurant | null>(null)
const selectedImageIndex = ref<number>(0)

async function getRestaurant() {
  try {
    const response = await getRestaurantService(id)
    restaurant.value = response?.data
  } catch (error) {
    console.error(getErrorMessage(error))
  }
}
onMounted(() => getRestaurant())
</script>

<template>
  <div class="w-full md:max-w-7xl mx-auto py-12">
    <div class="flex">
      <div class="flex flex-col gap-2 flex-1">
        <img
          :src="restaurant?.images[selectedImageIndex]?.secure_url"
          class="w-full h-[50vh] object-cover rounded-md"
        />
        <div class="flex gap-4">
          <div
            v-for="(image, index) of restaurant?.images"
            :key="image.secure_url"
            @click="selectedImageIndex = index"
            class="flex-1 cursor-pointer"
          >
            <img :src="image.secure_url" class="object-cover h-48 w-full rounded-md" />
          </div>
        </div>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>
