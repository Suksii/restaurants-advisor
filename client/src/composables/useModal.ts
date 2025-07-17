import { ref } from 'vue'

type ModalType = {
  type: string
  payload?: any
}

export function useModal<T = any>() {
  const showModal = ref<T | null>(null)

  const openModal = (item: T) => {
    showModal.value = item
  }

  const closeModal = () => {
    showModal.value = null
  }

  return { showModal, openModal, closeModal }
}
