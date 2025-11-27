<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div class="bg-white rounded-xl shadow-lg p-10 text-center relative w-auto">
      <button
        v-if="showClose"
        class="absolute top-3 right-3 text-gray-500"
        @click="$emit('close')"
      >
        ✕
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showClose?: boolean
}>()

defineEmits<{
  close: []
}>()
</script>
