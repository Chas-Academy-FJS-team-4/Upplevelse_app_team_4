<script setup lang="ts">
import Header from "../components/layout/Header.vue";
import HeroSection from "../components/Layout/HeroSection.vue";
import TopExperiences from "../components/Landingpage/TopExperiences.vue";
import Articles from "../components/Landingpage/Articles.vue";
</script>
<template>
  <Header />
  <HeroSection ref="heroRef" />
  <main class="">
    <TopExperiences />
    <Articles />
  </main>
</template>
