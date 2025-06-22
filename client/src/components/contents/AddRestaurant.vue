<script setup lang="ts">
import PlusIcon from '@/icons/PlusIcon.vue'
import { uploadImages } from '@/services/upload'
import { useNotificationStore } from '@/stores/notificationStore'
import { useRestaurantStore } from '@/stores/restaurantStore.ts'
import { getErrorMessage } from '@/utils/errorHandler'
import type { RestaurantPayload } from '@/utils/types'
import { reactive, ref } from 'vue'

const imageRef = ref<HTMLInputElement | null>(null)
const restaurantStore = useRestaurantStore()
const notificationStore = useNotificationStore()
const restaurantData: RestaurantPayload = reactive({
  name: '',
  images: [],
  location: '',
  category: '',
  description: '',
})

const resetForm = (): void => {
  restaurantData.name = ''
  restaurantData.category = ''
  restaurantData.location = ''
  restaurantData.images = []
  restaurantData.description = ''
}

async function handleUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return
  if (restaurantData.images.length + files.length > 10) {
    notificationStore.notifyError('You can upload a maximum of 10 images')
    return
  }
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i])
  }
  try {
    const uploadedImages = await uploadImages(formData)
    uploadedImages.forEach((image: any) => {
      restaurantData.images.push({
        secure_url: image.secure_url,
        public_id: image.public_id,
      })
    })
    console.log(uploadedImages)
  } catch (error) {
    notificationStore.notifyError(getErrorMessage(error as Error))
    console.error(error)
  }
}

const categories = ['Italian food', 'Chineese food', 'Mexican food']

async function handleAdd() {
  try {
    const response = await restaurantStore.addRestaurant({
      name: restaurantData.name,
      images: restaurantData.images,
      description: restaurantData.description,
      location: restaurantData.location,
      category: restaurantData.category,
    })
    resetForm()
    notificationStore.notifySuccess(response?.data?.message || 'Restaurant created successfully')
  } catch (error) {
    notificationStore.notifyError(getErrorMessage(error))
    console.error(getErrorMessage(error))
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center max-w-3xl mx-auto py-24">
    <h3 class="text-3xl font-medium">Add new restaurant</h3>
    <form @submit.prevent="handleAdd" class="flex flex-col w-full space-y-4">
      <div>
        <label class="label">Upload images</label>
        <div class="flex items-center flex-wrap gap-2">
          <div
            class="w-24 h-24 bg-gray-100 ring ring-gray-300 hover:ring-yellow-500 rounded flex items-center justify-center cursor-pointer transition duration-300"
            @click="imageRef?.click()"
          >
            <PlusIcon class="text-gray-400" />
            <input type="file" ref="imageRef" class="hidden" @change="handleUpload" multiple />
          </div>
          <img
            v-for="(image, index) in restaurantData.images"
            :key="index"
            :src="image.secure_url"
            class="w-24 h-24 object-cover rounded"
          />
        </div>
      </div>
      <div>
        <label class="label">Name</label>
        <input v-model="restaurantData.name" class="input px-2" />
      </div>
      <div>
        <label class="label">Location</label>
        <input v-model="restaurantData.location" class="input px-2" />
      </div>
      <div>
        <label class="label">Category</label>
        <select
          v-model="restaurantData.category"
          class="w-full ring focus:ring-2 ring-gray-300 focus:outline-none focus:ring-yellow-500 py-2 rounded-md"
        >
          <option disabled :selected="!restaurantData.category">Select category</option>
          <option v-for="option of categories" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div>
        <label class="label">Description</label>
        <textarea v-model="restaurantData.description" class="input px-2 min-h-32"></textarea>
      </div>
      <button class="button register-button">Add restaurant</button>
    </form>
  </div>
</template>
