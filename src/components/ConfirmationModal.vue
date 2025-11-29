<template>
  <BaseModal :show-close="true" @close="$emit('close')">
    <div class="mx-auto mb-4 w-20 h-20 bg-green-200 rounded-xl flex items-center justify-center">
      <span class="text-green-600 text-4xl">✔</span>
    </div>

    <h2 class="text-lg font-semibold mb-4">
      Your order has been placed!
    </h2>

    <p class="text-gray-600 mb-6">
      Tack för ditt köp! Du får ett mail med bokningsbekräftelse inom kort.
    </p>
    <button
      class="mt-4 bg-black text-white px-6 py-2 rounded"
      @click="$emit('close')"
    >
      Tillbaka till orderöversikt
    </button>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'

defineEmits<{
  close: []
}>()
</script>
