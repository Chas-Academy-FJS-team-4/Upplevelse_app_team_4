<script setup lang="ts">
import data from "../../utils/experiences.json";
import Card from "../experiencePage/ExperienceCard.vue";
// const allExperiences = Object.values(data).flat();
</script>
<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
    <Card
      v-for="experience in data"
      :key="experience.id"
      :activity="experience"
    />
  </div>
</template>
