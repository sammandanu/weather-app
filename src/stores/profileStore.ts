import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  const profileForm = ref({
    fullname: 'Jane Doe',
    email: 'jane@gmail.com',
    phone: '234 567 89',
    dialCode: '01',
    iso: 'US',
    avatar: ''
  })

  return { profileForm }
})
