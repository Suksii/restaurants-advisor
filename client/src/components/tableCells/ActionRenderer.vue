<script setup>
import EditIcon from '@/icons/EditIcon.vue'
import EyeIcon from '@/icons/EyeIcon.vue'
import TrashIcon from '@/icons/TrashIcon.vue'

const props = defineProps(['params'])

const handleView = () => {
  const data = props.params.data
  console.log('Handle View', data)
}
const handleDelete = () => {
  const data = props.params.data
  console.log('Handle Delete', data)
}
const handleEdit = () => {
  const data = props.params.data
  console.log('Handle Edit', data)
}
</script>

<template>
  <div class="flex items-center justify-end gap-1.5 h-full">
    <div title="View">
      <EyeIcon class="text-gray-700 cursor-pointer" @click.stop="handleView" />
    </div>
    <div title="Delete">
      <TrashIcon class="text-red-700 cursor-pointer" @click.stop="handleDelete" />
    </div>
    <div title="Edit">
      <EditIcon class="text-green-700 cursor-pointer" @click.stop="handleEdit" />
    </div>
  </div>
</template>
