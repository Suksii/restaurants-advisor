<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notification from './components/Notification.vue'
import AdminSidebar from './components/AdminSidebar.vue'
</script>

<template>
  <RouterView />
  <Notification />
</template>
