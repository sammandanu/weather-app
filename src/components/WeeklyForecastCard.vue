<script lang="ts" setup>
import moment from 'moment'
import type { ForecastListItem } from '@/api/data/dataInterfaces'
// utils 
import { convertKelvintoCelcius, upperCaseFirstLetter } from '@/utils/utils'
// assets 
import CaretRight from '@/assets/svg/caret-right.svg'

const props = defineProps<{ data: ForecastListItem[] }>()
</script>

<template>
    <div class="text-xl font-medium my-4">Weekly Forecast</div>
    <!-- Weekly forecast list  -->
    <div class="grid grid-cols-1 items-center gap-2" v-if="data && data.length > 0">
        <div class="flex gap-4 bg-blue-100 rounded-[12px] p-4  items-center justify-center text-white"
            v-for="forecast in data" :key="forecast.dt">
            <div class="flex items-center justify-center rounded-full w-14 bg-blue-300 flex-none">
                <img :src="`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`" loading="lazy"
                    class="w-full" alt="weatherIcon">
            </div>
            <div class="flex-1 flex items-center justify-between">
                <div class="">
                    <div class="font-semibold text-[14px] text-charcoal-900">
                        {{ moment(forecast.dt_txt).format('dddd') }}
                    </div>
                    <div class="text-[12px] text-charcoal-700">
                        {{ upperCaseFirstLetter(forecast.weather[0].description) }}
                    </div>
                </div>
                <div class="font-semibold text-[14px] text-charcoal-900">
                    {{ convertKelvintoCelcius(forecast.main.temp) }}º C
                </div>
            </div>
            <div class="flex-none text-charcoal-900">
                <CaretRight class="w-6 h-6" />
            </div>
        </div>
    </div>
</template>
