import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  const userCoords = ref<{ lat: number; lon: number } | null>(null)

  const profileForm = ref({
    fullname: 'Jane Doe',
    email: 'jane@gmail.com',
    phone: '234 567 89',
    dialCode: '01',
    iso: 'US',
    avatar: ''
  })

  const setUserCoord = (data: { lat: number; lon: number }) => {
    userCoords.value = data
  }
  const removeUserCoord = () => {
    userCoords.value = null
  }

  return { profileForm, userCoords, setUserCoord, removeUserCoord }
})
