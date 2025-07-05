<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// api
import GeoApi from '@/api/geo/geoApi';
// components 
import SearchInput from '@/components/SearchInput.vue';

type CityListType = {
    name: string
    country: string
    state?: string
    lat: number,
    lon: number
}


const emit = defineEmits(['onBlur'])
const router = useRouter()

const searchInput = ref('')
const searchInputOverlayRef = ref()
const isEmpty = ref(false)
const cityList = ref<CityListType[]>([])

const searchCity = async () => {
    try {
        isEmpty.value = false
        const geoApi = new GeoApi();
        const response = await geoApi.getCities(searchInput.value);
        if (response && response.length > 0) {
            cityList.value = response.map(res => {
                return {
                    name: res.name,
                    country: res.country,
                    state: res.state || '',
                    lat: res.lat,
                    lon: res.lon
                }
            })
        }

        else {
            isEmpty.value = true
        }
    } catch (error) {
        console.log("error", error);
    }
}

onMounted(() => {
    searchInputOverlayRef.value.focus()
})
</script>

<template>
    <div class="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center justify-start pt-8 px-4">
        <div class="w-full max-w-md mx-auto">
            <SearchInput ref="searchInputOverlayRef" v-model="searchInput" @search="searchCity()"
                @clear="emit('onBlur')" />
        </div>
        <div class="w-full max-w-md mx-auto mt-4 bg-white rounded-xl ">
            <ul v-if="!isEmpty">
                <li v-for="(city, idx) in cityList" :key="idx"
                    class="py-2 px-2 border-b  cursor-pointer hover:bg-gray-400 transition" @click="router.push({
                        name: 'detail-city',
                        query: {
                            lat: city.lat,
                            lon: city.lon
                        }
                    })">
                    <span class="font-bold">{{ city.name }}</span><span class="text-gray-600">, {{ city.country }} {{
                        city.state
                        }}
                    </span>
                </li>
            </ul>
            <div v-else class="py-2 px-2 text-center ">
                City not found
            </div>
        </div>
    </div>
</template>
