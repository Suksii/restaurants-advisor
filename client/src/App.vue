<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notification from './components/Notification.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <RouterView />
  <Notification />
</template>
