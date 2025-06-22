import { api } from '@/api'
import type { RestaurantPayload } from '@/utils/types'
import type { AxiosResponse } from 'axios'

export const addRestaurantService = async (
  payload: RestaurantPayload,
): Promise<AxiosResponse | undefined> => {
  const response = await api.post('/restaurants/add', payload)
  return response
}
export const getRestaurantsService = async (): Promise<AxiosResponse | undefined> => {
  const response = await api.get('/restaurants')
  return response
}
export const getRestaurantService = async (id: number): Promise<AxiosResponse | undefined> => {
  const response = await api.get('/restaurants' + id)
  return response
}
