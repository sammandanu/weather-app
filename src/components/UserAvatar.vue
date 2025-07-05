<script lang="ts" setup>
import { ref } from 'vue'

// store 
import { useProfileStore } from '@/stores/profileStore'

// assets 
import EditIcon from '@/assets/svg/edit.svg'
import avatarImage from '@/assets/images/avatar.png'


const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits(['change'])

const { profileForm } = useProfileStore()

const avatarUrl = ref(profileForm.avatar);

const fileInputRef = ref();
function onEditAvatarClick() {
    fileInputRef.value?.click();
}

function onAvatarChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarUrl.value = e.target?.result as string;
            emit('change', avatarUrl.value)
        };
        reader.readAsDataURL(file);
    }
}

</script>

<template>
    <!-- Avatar -->
    <div class="flex items-center justify-center mt-16 mb-4  z-10">
        <div class="w-32 h-32 rounded-full bg-blue-100  flex items-center justify-center relative ">
            <!-- image  -->
            <div class="w-full h-full flex items-center justify-center">
                <img :src="!avatarUrl ? avatarImage : avatarUrl" loading="lazy" alt="Avatar"
                    class="object-cover w-full h-full rounded-full" />
            </div>
            <!-- input  -->
            <template v-if="isEdit">
                <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
                <div class="absolute -bottom-2 right-0 w-12 h-12 p-2 bg-gray-700 rounded-full flex items-center justify-center border-4 border-white cursor-pointer"
                    @click="onEditAvatarClick">
                    <EditIcon class="text-black w-full" />
                </div>
            </template>
        </div>
    </div>
</template>
