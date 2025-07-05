<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, required: true },
  disabled: { type: Boolean, required: false },
  v$: { type: Object, required: false },
  placeholder: {
    type: String, required: false
  }
});
const emit = defineEmits(['update:modelValue']);

const inputRef = ref()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
  if (props.v$ && typeof props.v$.$touch === 'function') {
    props.v$.$touch();
  }
}
</script>

<template>
  <div class="border  rounded-lg py-3 px-4  w-full" @click="inputRef.focus()"
    :class="disabled ? 'bg-gray-700 border-gray-700' : 'bg-white border-gray-450'">
    <label class="block text-xs text-gray-750">{{ label }}</label>
    <input class="w-full border-none text focus:ring-transparent p-0 m-0 text-charcoal-800 placeholder:text-gray-600"
      :class="disabled ? 'bg-gray-700' : 'bg-white'" :value="modelValue" @input="onInput" type="text" ref="inputRef"
      :placeholder="placeholder" :disabled="disabled" />
  </div>
  <div v-if="v$ && v$.$error" class="text-xs text-red-500 mt-1">
    <div v-for="(error, key) in v$.$errors" :key="key">
      {{ error.$message }}
    </div>
  </div>
</template>
