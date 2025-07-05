import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', () => {
  const snackbar = ref({
    message: '',
    type: '',
    open: false
  })

  const useSnackbar = (message: string, type: string, timeout: number = 3000) => {
    snackbar.value.message = message
    snackbar.value.type = type
    snackbar.value.open = true

    setTimeout(() => {
      snackbar.value.open = false
    }, timeout)
  }

  return { snackbar, useSnackbar }
})
