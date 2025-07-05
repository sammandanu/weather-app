<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import UserAvatar from '@/components/UserAvatar.vue';
import WInput from '@/components/WInput.vue';
import useVuelidate from '@vuelidate/core';
import { required, email as emailValidator, minLength, helpers } from '@vuelidate/validators';
import VueTelInput from '@/components/VueTelInput.vue';
import type { CountryInterface } from '@/interfaces'

// store 
import { useProfileStore } from '@/stores/profileStore'

// asset 
import ChevronLeft from '@/assets/svg/chevron-left.svg'

const router = useRouter()
const { profileForm } = useProfileStore()
const isEdit = ref(false)

const form = ref({ ...profileForm });

const rules = {
    fullname: { required: helpers.withMessage('Full name is required', required) },
    phone: {
        required: helpers.withMessage('Phone number is required', required),
        minLength: helpers.withMessage('Phone number must be at least 10 digits', minLength(10)),
    },
    email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Email must be valid', emailValidator),
    },
};

const v$ = useVuelidate(rules, form);

const submitForm = () => {
    if (!isEdit.value) {
        isEdit.value = true
        return
    }
    v$.value.$touch();
    if (!v$.value.$invalid) {
        profileForm.fullname = form.value.fullname
        profileForm.phone = form.value.phone
        profileForm.email = form.value.email
        profileForm.dialCode = form.value.dialCode
        profileForm.iso = form.value.iso
        profileForm.avatar = form.value.avatar
        isEdit.value = false
    }
}

const countryChanged = (data: CountryInterface) => {
    form.value.dialCode = data.dialCode
    form.value.iso = data.iso2
}

const setAvatar = (url: string) => {
    form.value.avatar = url
}

</script>

<template>
    <div class="relative min-h-screen">
        <!-- header section  -->
        <div class="px-4 pt-8 pb-12 text-center relative bg-white rounded-b-3xl overflow-hidden">
            <!-- background -->
            <div class="absolute inset-0  h-48 clip-custom bg-purple-100 rotate-180"></div>
            <!-- header title  -->
            <div class="flex items-center mb-8 relative z-10">
                <div class="">
                    <ChevronLeft class="w-6 h-6" @click="router.back()" />
                </div>
                <div class="flex-1 text-xl font-semibold text-black">
                    Edit Profile
                </div>
                <div class="w-6"></div>
            </div>
            <!-- Avatar -->
            <UserAvatar :is-edit="isEdit" @change="setAvatar" />
            <!-- profile description  -->
            <div class="text-center">
                <div class="">{{ profileForm.fullname }}</div>
                <div class="">{{ profileForm.email }} | +{{ profileForm.dialCode }} {{ profileForm.phone }}</div>
            </div>
        </div>
        <!-- form  -->
        <form class="px-4 space-y-4 mt-6" @submit.prevent="submitForm">
            <div class=""></div>
            <WInput v-model="form.fullname" label="Full name" :v$="v$.fullname" placeholder="Full name"
                :disabled="!isEdit" />
            <WInput v-model="form.email" label="Email" :v$="v$.email" placeholder="Email" :disabled="!isEdit" />
            <VueTelInput v-model="form.phone"
                :error="v$.phone.$error ? String(v$.phone.$errors[0]?.$message || '') : ''" :disabled="!isEdit"
                @country-changed="countryChanged" :default-country="form.iso" />
            <div class="absolute bottom-0 left-0 right-0 pb-8 px-4">

                <button type="submit"
                    class="w-full py-3 rounded-lg bg-midnight-900 text-white font-semibold disabled:opacity-50 mt-2"
                    :disabled="v$.$invalid && v$.$dirty">
                    {{ isEdit ? 'SUBMIT' : 'EDIT' }}
                </button>
            </div>
        </form>
    </div>

</template>

<style scoped>
.clip-custom {
    clip-path: ellipse(75% 100% at 50% 100%);
}
</style>
