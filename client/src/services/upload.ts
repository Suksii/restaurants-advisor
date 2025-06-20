import { api } from '@/api'

export const uploadImages = async (formData: FormData) => {
  const response = await api.post('/upload/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
