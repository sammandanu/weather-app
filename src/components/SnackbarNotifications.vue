<script lang="ts" setup>
const props = defineProps({
  showing: {
    type: Boolean,
    default: false,
    required: true
  },
  type: {
    type: String
  },
  message: {
    type: String
  },
  multiline: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close', 'submit'])
</script>
<template>
  <Transition name="slide-fade">
    <div
      class="fixed left-0 right-0 bottom-5 flex items-center justify-center duration-500 ease-in-out"
      style="z-index: 2000"
      v-if="showing"
    >
      <div
        class="rounded inline-block"
        :class="[
          type === 'success' ? 'bg-success' : type === 'error' ? 'bg-error' : '',
          multiline ? 'py-4' : 'py-2'
        ]"
      >
        <div class="flex items-center justify-between gap-4 w-auto">
          <div>
            <div class="w-80 pl-4 text-white">{{ message }}</div>
          </div>
          <button
            @click="emit('close')"
            class="text-white mr-4 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-1 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
