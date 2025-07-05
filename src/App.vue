<script setup lang="ts">
import { RouterView } from 'vue-router'
import Snackbar from './components/SnackbarNotifications.vue';
import { useSnackbarStore } from '@/stores/snackbarStore'

const { snackbar } = useSnackbarStore()
</script>

<template>
  <div class="max-w-lg mx-auto">
    <RouterView />
    <Snackbar :showing="snackbar.open" :type="snackbar.type" :message="snackbar.message"
      @close="snackbar.open = false" />
  </div>
</template>

<style scoped></style>
