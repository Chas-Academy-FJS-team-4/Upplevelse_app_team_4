<script setup lang="ts">
import data from "../../utils/experiences.json";
import ExperienceCard from "../common/ExperienceCard.vue";
</script>
<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-4">
    <ExperienceCard :exp="exp" v-for="exp in data" :key="exp.id" />
  </div>
</template>
