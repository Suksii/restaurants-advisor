import type { RestaurantPayload } from './../utils/types'
import { addRestaurantService } from '@/services/restaurant'
import { defineStore } from 'pinia'

export const useRestaurantStore = defineStore('restaurant', {
  state: () => ({
    restaurantData: null as RestaurantPayload | null,
  }),
  actions: {
    async addRestaurant(payload: RestaurantPayload) {
      const response = await addRestaurantService(payload)
      this.restaurantData = response?.data
      return response
    },
  },
})