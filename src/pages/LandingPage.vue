<script setup lang="ts">
import Header from "../components/layout/Header.vue";
import HeroSection from "../components/layout/HeroSection.vue";
import TopExperiences from "../components/Landingpage/TopExperiences.vue";
import Articles from "../components/Landingpage/Articles.vue";
import { ref } from "vue";

const heroRef = ref<InstanceType<typeof HeroSection> | null>(null);

function focusSearchInHero() {
  heroRef.value?.focusSearch();
}
</script>
<template>
  <Header @focus-search="focusSearchInHero" />
  <HeroSection ref="heroRef" />
  <main class="">
    <TopExperiences />
    <Articles />
  </main>
</template>
