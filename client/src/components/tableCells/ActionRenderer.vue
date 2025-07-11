<script setup lang="ts">
import EditIcon from '@/icons/EditIcon.vue'
import EyeIcon from '@/icons/EyeIcon.vue'
import TrashIcon from '@/icons/TrashIcon.vue'
import Modal from '../Modal.vue'
import { useModal } from '@/composables/useModal'
import { ref, Teleport } from 'vue'
import UserContent from '../contents/UserContent.vue'

const props = defineProps(['params'])
const { openModal, showModal, closeModal } = useModal()
const rowData = ref<{
  _id: string
  username: string
  email: string
  role: string
  isActive: boolean
} | null>(null)

const handleView = () => {
  const data = props.params.data
  rowData.value = data
  openModal(data)
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
  <div class="flex items-center justify-end gap-1.5 h-full relative">
    <div title="View">
      <EyeIcon class="text-gray-700 cursor-pointer" @click.stop="handleView" />
      <div v-if="showModal !== null">
        <Modal @close="closeModal"> <UserContent :user="rowData" /></Modal>
      </div>
    </div>
    <div title="Delete">
      <TrashIcon class="text-red-700 cursor-pointer" @click.stop="handleDelete" />
    </div>
    <div title="Edit">
      <EditIcon class="text-green-700 cursor-pointer" @click.stop="handleEdit" />
    </div>
  </div>
</template>
