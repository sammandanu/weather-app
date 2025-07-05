<script lang="ts" setup>
import { ref, watch } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import type { CountryInterface } from '@/interfaces'



const props = defineProps({
    modelValue: { type: String, required: true },
    label: { type: String, required: false, default: 'Phone Number' },
    error: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    defaultCountry: { type: String, required: true }
});
const emit = defineEmits(['update:modelValue', 'countryChanged']);

const phone = ref(String(props.modelValue));

watch(() => props.modelValue, (val) => {
    phone.value = String(val ?? '');
});
watch(phone, (val) => {
    emit('update:modelValue', val);
});

const handleCountryChange = (data: CountryInterface) => {
    emit('countryChanged', data)
}

</script>

<template>
    <div class="border rounded-lg py-3 px-4 w-full" :class="disabled ? 'bg-gray-700' : 'bg-white'">
        <label class="block text-xs text-gray-750 mb-1">{{ label }}</label>
        <VueTelInput v-model="phone" :inputoptions="{ showDialCode: true }" :wrapperClasses="'w-full'"
            :inputClasses="`w-full text border-none focus:ring-transparent p-0 m-0 text-charcoal-800 ${disabled ? 'bg-gray-700' : 'bg-white'}`"
            :dropdownOptions="{ showFlags: true, showDialCodeInList: true }" :placeholder="'Enter phone number'"
            :disabled="disabled" @country-changed="handleCountryChange" :defaultCountry="defaultCountry" />
        <div v-if="error" class="text-xs text-red-500 mt-1">
            {{ error }}
        </div>
    </div>
</template>

<style scoped>
:deep(.vue-tel-input) {
    border: none;
}

:deep(.vue-tel-input:focus-within),
:deep(.vue-tel-input input:focus) {
    box-shadow: none;
    outline: none;
}

:deep(.vti__input:focus) {
    --tw-ring-color: transparent;
}

:deep(.vti__input::placeholder) {
    color: #8C939D;
}

:deep(.vti__input) {
    background: transparent;
}
</style>