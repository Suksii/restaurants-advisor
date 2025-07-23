<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { themeQuartz } from 'ag-grid-community'
import 'ag-grid-enterprise'

const props = defineProps<{
  rowData: any[]
  columnDefs: any[]
}>()

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
        class="ag-theme-quartz w-full h-full"
        :theme="themeQuartz"
        :defaultColDef="defaultColDef"
        :animateRows="true"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :pagination="true"
        :paginationPageSize="10"
        :paginationPageSizeSelector="[5, 10, 20]"
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
