<script setup lang="ts">
import BaseModal from "../common/BaseModal.vue";

defineEmits<{
  close: [];
}>();
</script>

<template>
  <BaseModal :show-close="true" @close="$emit('close')">
    <div
      class="mx-auto mb-4 w-20 h-20 bg-green-200 rounded-xl flex items-center justify-center"
    >
      <span class="text-green-600 text-4xl">✔</span>
    </div>

    <h2 class="text-lg font-semibold mb-4">Vi har nu mottagit din beställning!</h2>

    <p class="text-gray-600 mb-6">
      Tack för ditt köp! Du får ett mail med bokningsbekräftelse inom kort.
    </p>
    <button
      class="mt-4 bg-purple-800 hover:bg-purple-700 text-white px-6 py-2 rounded"
      @click="$emit('close')"
    >
      Visa orderbekräftelse
    </button>
  </BaseModal>
</template>
