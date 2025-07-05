<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import moment from 'moment';

// interfaces 
import type { WeatherApiResponse } from '@/interfaces'

// utils
import { getCountryName } from '@/utils/utils'
// stores 
import { useCitiesStore } from '@/stores/citiesStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
// api
import DataApi from '@/api/data/dataApi';
import GeoApi from '@/api/geo/geoApi';
// components 
import SearchModal from '@/components/SearchModal.vue';
import SearchInput from '@/components/SearchInput.vue';
import UserIcon from '@/assets/svg/user.svg'
import WeatherCard from '@/components/WeatherCard.vue';

// assets
import bgDay from '@/assets/images/bg-day.jpg'
import bgNight from '@/assets/images/bg-night.jpg'


const router = useRouter()
const { selectedCities } = useCitiesStore()
const { useSnackbar } = useSnackbarStore()

const searchFocused = ref(false)
const userCoords = ref<{ lat: number; lon: number } | null>(null)

const localCityData = ref()
const selectedCitiesData = ref<WeatherApiResponse[]>([])

const getUserLocation = () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        userCoords.value = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        try {
          const geoApi = new GeoApi();
          const result = await geoApi.reverseGeocode(userCoords.value.lat, userCoords.value.lon)
          if (result) {
            await getWeather(result.name, true)
          }
        } catch {
          useSnackbar('Error fetching user location', 'error')
        }
      },
      () => {
        userCoords.value = null
      }
    )
  } else {
    userCoords.value = null
  }
}

const getWeather = async (city: string, local: boolean) => {
  try {
    const dataApi = new DataApi();

    const response: WeatherApiResponse = await dataApi.getWeather(city);
    if (response) {
      const setResponse = {
        ...response,
        background: setDynamicBackground(response.dt, response.timezone),
        country: getCountryName(response.sys.country)
      }
      if (local) {
        localCityData.value = setResponse
      }
      else {
        selectedCitiesData.value.push(setResponse)

      }
    }
  } catch (error) {
    useSnackbar('Error fetching city weather', 'error')
  }
}

const setDynamicBackground = (dt: number, timezone: number) => {
  const cityHour = Number(moment.unix(dt).utcOffset(timezone / 60).format('HH'))

  return (cityHour >= 6 && cityHour < 18) ? bgDay : bgNight
}
const handleSearchFocus = () => {
  searchFocused.value = true
}

onMounted(async () => {
  getUserLocation();
  if (selectedCities && selectedCities.length > 0) {
    try {
      const promises = selectedCities.map(city => getWeather(city, false));
      await Promise.all(promises);
    } catch (error) {
      useSnackbar('Error fetching weather for cities', 'error')
    }
  }
});
</script>
<template>
  <div class="p-4">
    <!-- top search  -->
    <transition name="fade-slide">
      <SearchModal v-if="searchFocused" @on-blur="searchFocused = false" />
    </transition>

    <!-- current city list -->
    <transition name="fade-slide">
      <div v-if="!searchFocused">
        <!-- header  -->
        <div class="flex items-center justify-between mb-2">
          <div class="font-bold text-[37px]">
            Weather
          </div>
          <div class="">
            <UserIcon class="text-midnight-900 w-6 h-6" @click="router.push('/profile')" />
          </div>
        </div>

        <!-- search  -->
        <div class="mb-6">
          <SearchInput @focus="handleSearchFocus" />
        </div>

        <!-- city list  -->
        <div class="">
          <!-- user location  -->
          <template v-if="localCityData">
            <WeatherCard title="My Location" :data="localCityData" />
          </template>
          <template v-if="selectedCitiesData">
            <WeatherCard :title="city.name" :data="city" v-for="city in selectedCitiesData" :key="city.id" />
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
