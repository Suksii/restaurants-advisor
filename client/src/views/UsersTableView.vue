<script setup lang="ts">
import { getUsers } from '@/services/auth'
import { getErrorMessage } from '@/utils/errorHandler'
import { onMounted, ref } from 'vue'
import ActionRenderer from '@/components/tableCells/ActionRenderer.vue'
import TableGrid from '@/components/TableGrid.vue'

type UserDataType = {
  _id: string
  username: string
  email: string
  role: string
  isActive: boolean
}

const userData = ref<UserDataType[]>([])

onMounted(async () => {
  try {
    const response = await getUsers()
    userData.value = response
  } catch (error) {
    console.error(getErrorMessage(error))
  }
})

const columnDefs = ref([
  { field: '_id', headerName: 'ID' },
  { field: 'isActive', headerName: 'Status' },
  { field: 'username', headerName: 'Username' },
  { field: 'email', headerName: 'Email' },
  { field: 'role', headerName: 'Role' },
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
      tableName: 'users',
    },
  },
])
</script>

<template>
  <TableGrid :columnDefs="columnDefs" :rowData="userData" />
</template>
