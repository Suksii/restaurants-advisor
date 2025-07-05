<script setup lang="ts">
const props = defineProps<{
  isOpened: boolean
}>()

const sidebarMenu = []
</script>

<template>
  <aside
    class="w-72 bg-blue-950 text-white rounded-2xl m-4 overflow-hidden shadow-2xl transition-all duration-300 ease-in-out origin-left"
    :class="
      isOpened
        ? 'max-h-[500px] opacity-100 scale-100 translate-x-0'
        : 'max-h-0 opacity-0 scale-95 -translate-x-4 pointer-events-none'
    "
  >
    <div class="p-5 w-full text-2xl font-bold tracking-wide border-b border-blue-600 text-center">
      Admin Panel
    </div>
    <nav class="flex-1 p-2 w-full">
      <ul>
        <li
          class="w-full p-4 rounded-lg text-lg font-medium transition hover:bg-white hover:text-blue-950 cursor-pointer"
        >
          Dashboard
        </li>
        <li
          class="w-full p-4 rounded-lg text-lg font-medium transition hover:bg-white hover:text-blue-950 cursor-pointer"
        >
          Restorani
        </li>
        <li
          class="w-full p-4 rounded-lg text-lg font-medium transition hover:bg-white hover:text-blue-950 cursor-pointer"
        >
          Recenzije
        </li>
        <li
          class="w-full p-4 rounded-lg text-lg font-medium transition hover:bg-white hover:text-blue-950 cursor-pointer"
        >
          Korisnici
        </li>
        <li
          class="w-full p-4 rounded-lg text-lg font-medium transition hover:bg-white hover:text-blue-950 cursor-pointer"
        >
          Podešavanja
        </li>
      </ul>
    </nav>
  </aside>
</template>
