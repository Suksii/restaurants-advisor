<script setup lang="ts">
import EditIcon from '@/icons/EditIcon.vue'
import EyeIcon from '@/icons/EyeIcon.vue'
import TrashIcon from '@/icons/TrashIcon.vue'
import Modal from '../Modal.vue'
import { useModal } from '@/composables/useModal'
import { computed, ref } from 'vue'
import { useComponentToRender } from '@/composables/useComponentToRender'
import { useDeleteActions } from '@/composables/useDeleteAction'
import DeleteContent from '../contents/DeleteContent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['params'])
const emit = defineEmits(['reload'])
const { openModal, showModal, closeModal } = useModal()
const { componentToRender, componentProps, setComponent } = useComponentToRender()
const { deleteByTable } = useDeleteActions()
const rowData = ref<any>(null)
const currentModal = ref<string | null>(null)
const data = computed(() => props.params.data)
const tableName = computed(() => props.params.tableName)

const handleView = () => {
  rowData.value = data.value
  setComponent(tableName.value, data.value)
  currentModal.value = 'view'
  openModal(data.value)
}
const handleOpenDeleteModal = () => {
  rowData.value = data.value
  currentModal.value = 'delete'
  openModal(data.value)
}
const handleDelete = async () => {
  await deleteByTable(tableName.value, data.value._id)
  currentModal.value = null
  closeModal()
}
const handleEdit = () => {
  router.push({ path: `/update-restaurant/${data.value._id}` })
}
function closeAll() {
  currentModal.value = null
  closeModal()
}
</script>

<template>
  <div class="flex items-center justify-end gap-1.5 h-full relative">
    <div title="View">
      <EyeIcon class="text-gray-700 cursor-pointer" @click.stop="handleView" />
      <div v-if="currentModal === 'view' && componentToRender">
        <Modal @close="closeAll">
          <component :is="componentToRender" v-bind="componentProps" />
        </Modal>
      </div>
    </div>
    <div title="Delete">
      <TrashIcon class="text-red-700 cursor-pointer" @click.stop="handleOpenDeleteModal" />
      <div v-if="currentModal === 'delete'">
        <Modal @close="closeAll">
          <DeleteContent @cancelDelete="closeAll" @confirmDelete="handleDelete" :item="data.name" />
        </Modal>
      </div>
    </div>
    <div title="Edit">
      <EditIcon class="text-green-700 cursor-pointer" @click.stop="handleEdit" />
    </div>
  </div>
</template>
