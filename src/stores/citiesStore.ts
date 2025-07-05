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
    const findCity = selectedCities.value.find((city) => city === cityID)
    if (!findCity) {
      selectedCities.value.splice(0, 1)
    } else {
      selectedCities.value = selectedCities.value.filter((city) => city !== cityID)
    }
  }
  return { selectedCities, addCity, removeCity }
})
