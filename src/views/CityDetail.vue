<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import moment from 'moment'

// stores 
import { useCitiesStore } from '@/stores/citiesStore';
import { useSnackbarStore } from '@/stores/snackbarStore';

// utils 
import { getCountryName, upperCaseFirstLetter } from '@/utils/utils'

// api
import DataApi from '@/api/data/dataApi';
import type { ForecastListItem } from '@/api/data/dataInterfaces';

// components 
import HourlyForecastCard from '@/components/HourlyForecastCard.vue';
import WeeklyForecastCard from '@/components/WeeklyForecastCard.vue';

// assets 
import ChevronLeft from '@/assets/svg/chevron-left.svg'
import Plus from '@/assets/svg/plus.svg'
import Refresh from '@/assets/svg/refresh.svg'

const router = useRouter()
const route = useRoute()

const { addCity } = useCitiesStore()
const { useSnackbar } = useSnackbarStore()

const currentCity = ref()
const coord = ref({
    lat: '',
    lon: ''
})
const currentCityTime = ref()
const currentCityWeather = ref<ForecastListItem | null>(null)

const hourlyForecast = ref<ForecastListItem[]>([])
const weeklyForecast = ref<ForecastListItem[]>([])

const getForecast = async () => {
    try {
        const dataApi = new DataApi();
        const response = await dataApi.getHourlyForecast(coord.value.lat, coord.value.lon);
        if (response) {
            currentCity.value = response.city

            const timezoneOffsetMinutes = currentCity.value.timezone / 60;
            currentCityTime.value = moment().utcOffset(timezoneOffsetMinutes).format('hh:mm A')
            const currentCityHour = moment().utcOffset(timezoneOffsetMinutes).format('HH')

            const seenWeeklyDays = new Set<string>();
            const tempHourlyForecast: ForecastListItem[] = [];
            let previousItem: ForecastListItem | null = null;

            response.list.forEach((item: ForecastListItem) => {
                const today = moment(response.list[0]).format('YYYY-MM-DD');
                const day = moment(item.dt_txt).format('YYYY-MM-DD');
                const nextDay = moment(today).add(1, 'day').format('YYYY-MM-DD');
                const hour = moment(item.dt_txt).format('HH');
                // set weekly forecast get data closest to 9AM 
                if (!seenWeeklyDays.has(day) && hour === '09' && day !== today) {
                    seenWeeklyDays.add(day);
                    weeklyForecast.value.push(item);
                }
                if (!currentCityWeather.value) {
                    previousItem = item
                }
                // set hourly forecast and get data that have 00 minute
                if ((day === today && hour > currentCityHour) || day == nextDay) {
                    if (!currentCityWeather.value) {
                        currentCityWeather.value = previousItem
                    }
                    tempHourlyForecast.push(item);
                }
            });
            // splice it to 4 data 
            hourlyForecast.value = tempHourlyForecast.splice(0, 4)
        }
    } catch (error) {
        useSnackbar('Error fetching forecast', 'error')
    }
}



const reFetchWeather = async () => {
    await getForecast()
}

const addCurrentCity = (cityName: string) => {
    addCity(cityName)
    useSnackbar('City added successfully!', 'success')
    router.push('/')
}

onMounted(() => {
    coord.value.lat = route.query.lat!.toString()
    coord.value.lon = route.query.lon!.toString()
    getForecast()
})
</script>

<template>
    <div class="">
        <!-- header section  -->
        <div class="header-background px-4 py-8 text-white text-center " v-if="currentCity && currentCityWeather">
            <div class="flex items-center  mb-8">
                <div class="">
                    <ChevronLeft class="w-6 h-6" @click="router.back()" />
                </div>
                <div class="flex-1 text-[14px]">
                    {{ currentCity.name }}, {{ getCountryName(currentCity.country) }}
                </div>
                <div class="">
                    <Plus class="w-5 h-5" @click="addCurrentCity(currentCity.name)" />
                </div>
            </div>
            <div class="text-[14px] mb-2 ">{{ moment().format('dddd, DD MMMM YYYY') }}</div>
            <div class="flex items-center justify-center mb-2 w-">
                <img :src="`https://openweathermap.org/img/wn/${currentCityWeather.weather[0].icon}@4x.png`"
                    class="w-32" alt="weatherIcon" loading="lazy">
            </div>
            <div class="text-xl mb-1">
                {{ currentCityWeather.main.temp.toString().substring(0, 2) }}º C
            </div>
            <div class="mb-8 text-xl font-semibold">
                {{ upperCaseFirstLetter(currentCityWeather.weather[0].description) }}
            </div>
            <div class="flex items-center gap-2 justify-center text-[14px]">
                <span> Last Update {{ currentCityTime }}
                </span>
                <span>
                    <Refresh class="w-4 h-4 cursor-pointer" @click="reFetchWeather()" />
                </span>
            </div>
        </div>
        <div class="px-4 pb-4">
            <!-- hourly forecast  -->
            <template v-if="hourlyForecast && hourlyForecast.length > 0">
                <HourlyForecastCard :data="hourlyForecast" />
            </template>
            <!-- Weekly forecast  -->
            <template v-if="weeklyForecast && weeklyForecast.length > 0">
                <WeeklyForecastCard :data="weeklyForecast" />
            </template>
        </div>
    </div>
</template>

<style scoped>
.header-background {
    background: #4F80FA;
    background: linear-gradient(149deg, rgba(79, 128, 250, 1) 0%, rgba(55, 100, 215, 1) 50%, rgba(51, 95, 209, 1) 100%);
}
</style>
