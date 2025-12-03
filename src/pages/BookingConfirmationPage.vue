<script setup lang="ts">
function goHome() {
  window.location.href = "/";
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="bg-white p-10 rounded-xl shadow text-center w-96">
      <div
        class="mx-auto mb-4 w-20 h-20 bg-green-200 rounded-xl flex items-center justify-center"
      >
        <span class="text-green-600 text-4xl">✔</span>
      </div>

      <h2 class="text-lg font-semibold mb-4">Your order has been placed!</h2>

      <p class="text-gray-600 mb-6">
        Tack för ditt köp! Du får ett mail med bokningsbekräftelse inom kort.
      </p>

      <button class="bg-black text-white px-6 py-2 rounded" @click="goHome">
        Tillbaka till startsidan
      </button>
    </div>
  </div>
</template>
