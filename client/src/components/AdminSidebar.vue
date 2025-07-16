<script setup lang="ts">
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  isOpened: boolean
}>()

const showSubmenuId = ref<number | null>(null)
const router = useRouter()

const sidebarMenu = [
  {
    id: 1,
    name: 'Dashboard',
  },
  {
    id: 2,
    name: 'Restaurants',
    subitems: [
      {
        id: 'Restaurants-1',
        name: 'Add restaurant',
        link: '/add-restaurant',
      },
      {
        id: 'Restaurants-2',
        name: 'View restaurants',
        link: '/restaurants',
      },
    ],
  },
  {
    id: 3,
    name: 'Reviews',
  },
  {
    id: 4,
    name: 'Users',
    subitems: [
      {
        id: 231314,
        name: 'Add user',
        link: '',
      },
      {
        id: 231314123,
        name: 'View users',
        link: '/users',
      },
    ],
  },
  {
    id: 5,
    name: 'Settings',
  },
]
</script>

<template>
  <aside
    class="w-72 bg-sidebar text-white rounded-2xl m-4 overflow-hidden shadow-2xl transition-all duration-300 ease-in-out origin-left relative"
    :class="
      isOpened
        ? 'max-h-[500px] opacity-100 scale-100 translate-x-0'
        : 'max-h-0 opacity-0 scale-95 -translate-x-4 pointer-events-none'
    "
  >
    <div
      class="p-5 w-full text-2xl font-bold tracking-wide border-b border-sidebar-hover text-center"
    >
      Admin Panel
    </div>
    <nav class="flex-1 p-2 w-full">
      <ul>
        <li
          v-for="item in sidebarMenu"
          :key="item.id"
          @click="showSubmenuId = item.id"
          class="w-full p-4 rounded-lg text-lg font-medium transition hover:bg-sidebar-hover cursor-pointer"
        >
          {{ item.name }}

          <div
            v-if="item.subitems"
            class="absolute inset-0 bg-sidebar text-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out origin-left z-20"
            :class="
              showSubmenuId === item.id
                ? 'opacity-100 scale-100 translate-x-0'
                : 'opacity-0 scale-95 -translate-x-4 pointer-events-none'
            "
          >
            <div
              class="p-5 w-full text-2xl font-bold tracking-wide border-b border-sidebar-hover text-center"
            >
              <div class="flex justify-between items-center">
                <p>{{ item.name }}</p>
                <button @click.stop="showSubmenuId = null" class="cursor-pointer">
                  <ArrowLeftIcon />
                </button>
              </div>
            </div>
            <ul>
              <li
                v-for="subitem in item.subitems"
                @click="subitem?.link && router.push(subitem?.link)"
                class="w-full p-4 rounded-lg text-lg font-medium transition hover:bg-sidebar-hover cursor-pointer"
              >
                {{ subitem.name }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>
