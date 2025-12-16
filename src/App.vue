<script setup>
import Footer from "./components/layout/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
