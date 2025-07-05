<script lang="ts" setup>
import { useRouter } from 'vue-router';

// utils
import { setCelcius, upperCaseFirstLetter } from '@/utils/utils'

// assets
import bgDay from '@/assets/images/bg-day.jpg'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const router = useRouter()

</script>

<template>
    <div :style="{ backgroundImage: `url(${data.background})` }" v-if="data"
        class="bg-cover  bg-no-repeat  h-[117px] rounded-2xl relative mb-4"
        :class="data.background === bgDay ? 'bg-center' : 'bg-right-top'"
        @click="router.push({ name: 'detail-city', query: data.coord })">
        <div class="absolute inset-0 rounded-2xl bg-black/30" :class="data.background === bgDay ? '' : ''">
        </div>
        <div class="absolute inset-0 text-white py-3 px-4 rounded-2xl flex flex-col justify-between">
            <div class="flex items-center justify-between">
                <div class="">
                    <div class="font-bold text-2xl">{{ title }}</div>
                    <div class="">
                        {{ data.name }}, {{ data.country }}
                    </div>
                </div>
                <div class="text-5xl font-light">{{ setCelcius(data.main.temp) }}</div>
            </div>
            <div class="flex items-center justify-between">
                <div class="">
                    {{ upperCaseFirstLetter(data.weather[0].description) }}
                </div>
                <div class="">
                    H:{{ setCelcius(data.main.temp_max)
                    }} L:{{ setCelcius(data.main.temp_min)
                    }}
                </div>
            </div>
        </div>
    </div>
</template>
