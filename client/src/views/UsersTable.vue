<script setup>
import { getUsers } from '@/services/auth'
import { getErrorMessage } from '@/utils/errorHandler'
import { onMounted, ref } from 'vue'

const users = ref([])

onMounted(async () => {
  try {
    const response = await getUsers()
    users.value = response
    console.log(users.value)
  } catch (error) {
    console.error(getErrorMessage(error))
  }
})
</script>

<template></template>
