<script lang="ts" setup>
import { ref, watch, computed, defineExpose } from 'vue'
import { debounce } from 'lodash'
import DeleteIcon from '@/assets/svg/close.svg'
import SearchIcon from '@/assets/svg/search.svg'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
})
const emit = defineEmits(['search', 'update:modelValue', 'focus', 'blur', 'clear'])

const searchInputRef = ref()
const focus = ref(false)

const emitSearch = (value: string) => {
    emit('search', value)
}

const searchInput = computed({
    get() {
        return props.modelValue
    },

    set(value) {
        return emit('update:modelValue', value)
    }
})

watch(
    () => searchInput.value,
    debounce(() => {
        emitSearch(searchInput.value)
    }, 500)
)

const clearSearch = () => {
    searchInput.value = ''
    emit('clear')
}

defineExpose({
    focus: () => {
        searchInputRef.value?.focus()
    }
})

</script>

<template>
    <!-- search input -->
    <div class="py-2 px-3  rounded-[10px] flex gap-4 items-center bg-gray-400 cursor-text "
        @click="searchInputRef.focus()">
        <!-- icon -->
        <SearchIcon class="text-gray-600 w-5 h-5 flex-none" />
        <!-- input -->
        <input ref="searchInputRef" type="text"
            class="border-none focus:ring-transparent p-0 m-0 flex-1 bg-gray-400 placeholder:text-gray-300"
            @focus="() => { focus = true; emit('focus') }" @blur="() => { focus = false; emit('blur') }"
            @keyup.enter="emitSearch(searchInput)" v-model="searchInput" placeholder="Search for a city" />
        <!-- delete icon -->
        <delete-icon v-show="searchInput" @click.stop="clearSearch()"
            class="text-gray-600 w-5 h-5 flex-none  cursor-pointer" />
    </div>
</template>
