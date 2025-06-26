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
        <div class="overflow-hidden">
          <Transition
            enter-active-class="transition-opacity duration-200"
            leave-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            mode="out-in"
          >
            <img
              :src="restaurant?.images[selectedImageIndex]?.secure_url"
              :key="restaurant?.images[selectedImageIndex]?.secure_url"
              class="w-full h-[50vh] object-cover rounded-md hover:scale-105 transition-transform ease-in-out duration-200"
            />
          </Transition>
        </div>
        <div class="flex gap-4">
          <div
            v-for="(image, index) of restaurant?.images"
            :key="image.secure_url"
            @click="selectedImageIndex = index"
            class="flex-1 cursor-pointer overflow-hidden rounded-md"
          >
            <img
              :src="image.secure_url"
              class="object-cover h-48 w-full hover:scale-105 transition-transform ease-in-out duration-200"
            />
          </div>
        </div>
      </div>
      <div class="flex-1">
        <!-- {{ info }} -->
      </div>
    </div>
  </div>
</template>
