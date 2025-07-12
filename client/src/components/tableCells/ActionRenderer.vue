<script setup lang="ts">
import EditIcon from '@/icons/EditIcon.vue'
import EyeIcon from '@/icons/EyeIcon.vue'
import TrashIcon from '@/icons/TrashIcon.vue'
import Modal from '../Modal.vue'
import { useModal } from '@/composables/useModal'
import { ref } from 'vue'
import { useComponentToRender } from '@/composables/useComponentToRender'

const props = defineProps(['params'])
const { openModal, showModal, closeModal } = useModal()
const { componentToRender, componentProps, setComponent } = useComponentToRender()
const rowData = ref<any>(null)

const handleView = () => {
  const data = props.params.data
  const tableName = props.params?.tableName
  console.log(data, tableName)

  rowData.value = data
  setComponent(tableName, data)
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
      <div v-if="showModal && componentToRender">
        <Modal @close="closeModal">
          <component :is="componentToRender" v-bind="componentProps" />
        </Modal>
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
