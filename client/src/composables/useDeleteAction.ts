import { deleteRestaurantService, getRestaurantsService } from '@/services/restaurant'
import { useRestaurantStore } from '@/stores/restaurantStore'

export function useDeleteActions() {
  const restaurantStore = useRestaurantStore()

  const deleteActions: Record<string, (id: string) => Promise<any>> = {
    restaurants: deleteRestaurantService,
  }
  const getActions: Record<string, () => Promise<any>> = {
    restaurants: restaurantStore.getRestaurants,
  }
  const deleteByTable = async (tableName: string, id: string) => {
    await deleteActions[tableName](id)
    return await getActions[tableName]()
  }
  return { deleteByTable }
}
