<script setup lang="ts">
import data from "../../utils/experiences.json";
import ExperienceCard from "../common/ExperienceCard.vue";
</script>
<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 mb-20">
    <ExperienceCard :exp="exp" v-for="exp in data" :key="exp.id" />
  </div>
</template>
