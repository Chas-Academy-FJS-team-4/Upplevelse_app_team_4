<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-lg p-6 text-center relative w-full max-w-3xl max-h-[90vh] overflow-auto">
      <button
        v-if="showClose"
        class="absolute top-3 right-3 text-gray-500 "
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
