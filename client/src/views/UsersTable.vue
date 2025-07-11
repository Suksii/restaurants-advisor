<script setup>
import { getUsers } from '@/services/auth'
import { getErrorMessage } from '@/utils/errorHandler'
import { AgGridVue } from 'ag-grid-vue3'
import { onMounted, ref } from 'vue'
import { themeQuartz } from 'ag-grid-community'
import ActionRenderer from '@/components/tableCells/ActionRenderer.vue'

const rowData = ref([])

onMounted(async () => {
  try {
    const response = await getUsers()
    rowData.value = response
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
  },
])

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  minWidth: 100,
  flex: 1,
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center p-2">
    <div class="w-full max-w-7xl h-[600px] overflow-hidden">
      <AgGridVue
        class="ag-theme-custom w-full h-full"
        :theme="themeQuartz"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :animateRows="true"
      />
    </div>
  </section>
</template>

<style>
:root {
  --ag-foreground-color: #1e293b;
  --ag-background-color: #ffffff;
  --ag-header-background-color: #f8fafc;
  --ag-header-foreground-color: #0f172a;
  --ag-row-hover-color: #ecfdf5;
  --ag-border-color: #e2e8f0;
  --ag-font-family: 'Inter', 'Segoe UI', sans-serif;
  --ag-font-size: 15px;
  --ag-grid-size: 6px;
  --ag-row-height: 48px;
}

.ag-header-cell {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.6px;
}

.ag-row {
  transition: background-color 0.25s ease;
}

.ag-center-cols-container .ag-row:nth-child(even) {
  background-color: #f9fafb;
}

.ag-row:hover {
  background-color: #ecfdf5 !important;
}

.ag-cell {
  padding-left: 12px !important;
  padding-right: 12px !important;
}

.ag-root ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.ag-root ::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.ag-root ::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
