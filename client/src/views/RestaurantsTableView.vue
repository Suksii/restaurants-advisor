<script setup lang="ts">
import ActionRenderer from '@/components/tableCells/ActionRenderer.vue'
import TableGrid from '@/components/TableGrid.vue'
import { useRestaurantStore } from '@/stores/restaurantStore'
import { onMounted, ref } from 'vue'

const restaurantStore = useRestaurantStore()

onMounted(async () => {
  await restaurantStore.getRestaurants()
})

console.log(restaurantStore.restaurants)

const columnDefs = ref([
  { field: '_id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'category', headerName: 'Category' },
  { field: 'location', headerName: 'Location' },
  { field: 'rating', headerName: 'Rating' },
  {
    field: 'akcije',
    headerName: 'Akcije',
    cellRenderer: ActionRenderer,
    suppressMovable: true,
    suppressFiltersToolPanel: true,
    suppressColumnsToolPanel: true,
    suppressHeaderMenuButton: true,
    filter: false,
    sortable: false,
    pinned: 'right',
    cellRendererParams: {
      tableName: 'restaurants',
    },
  },
])
</script>

<template>
  <div>
    <TableGrid :rowData="restaurantStore.restaurants" :columnDefs="columnDefs" />
  </div>
</template>
