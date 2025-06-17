<script setup lang="ts">
import PlusIcon from '@/icons/PlusIcon.vue'
import { ref } from 'vue'

const imageRef = ref<HTMLInputElement | null>(null)

const categories = ['Italian food', 'Chineese food', 'Mexican food']
</script>

<template>
  <div class="flex flex-col justify-center items-center max-w-3xl mx-auto py-24">
    <h3 class="text-3xl font-medium">Add new restaurant</h3>
    <form class="flex flex-col w-full space-y-4">
      <div>
        <label class="label">Upload images</label>
        <div class="flex items-center flex-wrap gap-2">
          <div
            class="w-24 h-24 bg-gray-100 ring ring-gray-300 hover:ring-yellow-500 rounded flex items-center justify-center cursor-pointer transition duration-300"
            @click="imageRef?.click()"
          >
            <PlusIcon class="text-gray-400" />
            <input type="file" ref="imageRef" class="hidden" />
          </div>
          <img
            v-for="n in 12"
            :key="n"
            src="../../assets//restaurant-bg.jpeg"
            class="w-24 h-24 object-cover rounded"
          />
        </div>
      </div>
      <div>
        <label class="label">Name</label>
        <input class="input px-2" />
      </div>
      <div>
        <label class="label">Location</label>
        <input class="input px-2" />
      </div>
      <div>
        <label class="label">Category</label>
        <select
          class="w-full ring focus:ring-2 ring-gray-300 focus:outline-none focus:ring-yellow-500 py-2 rounded-md"
        >
          <option disabled>Select category</option>
          <option v-for="option of categories" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div>
        <label class="label">Description</label>
        <textarea class="input px-2 min-h-32"></textarea>
      </div>
      <button class="button register-button">Add restaurant</button>
    </form>
  </div>
</template>
