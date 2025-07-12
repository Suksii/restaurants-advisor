import UserContent from '@/components/contents/UserContent.vue'
import { ref } from 'vue'

export const useComponentToRender = () => {
  const componentToRender = ref()

  const setComponent = (data: string) => {
    switch (data) {
      case 'users':
        componentToRender.value = UserContent
        break
      default:
        componentToRender.value = null
    }
  }

  return { setComponent, componentToRender }
}
