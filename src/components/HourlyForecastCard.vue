<script lang="ts" setup>
// utils 
import { convertKelvintoCelcius } from '@/utils/utils'
import type { ForecastListItem } from '@/api/data/dataInterfaces'
import moment from 'moment'

const props = defineProps<{ data: ForecastListItem[] }>()
</script>

<template>
    <div class="text-xl font-medium my-4">Hourly Forecast</div>
    <!-- forecast list  -->
    <div class="grid grid-cols-4 items-center gap-2" v-if="data && data.length > 0">
        <div class="flex gap-2 bg-gray-700 rounded-[4px] p-4 flex-col items-center justify-center "
            v-for="forecast in data" :key="forecast.dt">
            <div class="flex items-center justify-center rounded-full w-12 bg-blue-300">
                <img :src="`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`" loading="lazy"
                    class="w-full" alt="weatherIcon">
            </div>
            <div class="font-semibold text-[14px]">
                {{ convertKelvintoCelcius(forecast.main.temp) }}
            </div>
            <div class="text-[12px]">
                {{ moment(forecast.dt_txt).format('hh:mm A') }}
            </div>
        </div>
    </div>
</template>
