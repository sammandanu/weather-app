import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', () => {
  const selectedCities = ref<string[]>([])

  const addCity = (cityID: string) => {
    if (!selectedCities.value.includes(cityID)) {
      selectedCities.value.push(cityID)
    }
  }
  const removeCity = (cityID: string) => {
    selectedCities.value = selectedCities.value.filter((city) => city !== cityID)
  }
  return { selectedCities, addCity, removeCity }
})
