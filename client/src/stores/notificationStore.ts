import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    message: '',
    show: false,
    isError: false,
  }),
  actions: {
    notifySuccess(message: string) {
      this.message = message
      this.show = true
      this.isError = false
      this.timeout()
    },
    notifyError(message: any) {
      this.message = message
      this.show = true
      this.isError = true
      this.timeout()
    },
    timeout() {
      setTimeout(() => {
        this.show = false
      }, 3000)
    },
  },
})
