import RestaurantContent from '@/components/contents/RestaurantContent.vue'
import UserContent from '@/components/contents/UserContent.vue'
import { ref, markRaw, type Component } from 'vue'

export const useComponentToRender = () => {
  const componentToRender = ref<Component | null>(null)
  const componentProps = ref<Record<string, any>>({})

  const setComponent = (table: string, data: any) => {
    switch (table) {
      case 'users':
        componentToRender.value = markRaw(UserContent)
        componentProps.value = { user: data }
        break
      case 'restaurants':
        componentToRender.value = markRaw(RestaurantContent)
        componentProps.value = { restaurant: data }
        break
      default:
        componentToRender.value = null
    }
  }

  return { setComponent, componentToRender, componentProps }
}
