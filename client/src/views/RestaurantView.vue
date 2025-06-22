<script setup lang="ts">
import { getRestaurantService } from '@/services/restaurant'
import { getErrorMessage } from '@/utils/errorHandler'
import type { Restaurant } from '@/utils/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id as string
const restaurant = ref<Restaurant | null>(null)

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
  <div>{{ restaurant?.name }}</div>
</template>
