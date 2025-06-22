import type { Restaurant, RestaurantPayload } from './../utils/types'
import { addRestaurantService, getRestaurantsService } from '@/services/restaurant'
import { defineStore } from 'pinia'

export const useRestaurantStore = defineStore('restaurant', {
  state: () => ({
    restaurantData: null as RestaurantPayload | null,
    restaurants: [] as RestaurantPayload[],
  }),
  actions: {
    async addRestaurant(payload: RestaurantPayload) {
      const response = await addRestaurantService(payload)
      this.restaurantData = response?.data
      return response
    },
    async getRestaurants() {
      const response = await getRestaurantsService()
      this.restaurants = response?.data;
      return response
    },
  },
})
