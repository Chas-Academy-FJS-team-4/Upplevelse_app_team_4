<script setup lang="ts">
import data from "../../utils/experiences.json";
import ExperienceCard from "../common/ExperienceCard.vue";
import { computed } from "vue";

type Filter = {
  tags?: string[];
  ageGroup?: string;
};

const props = defineProps<{
  filter?: Filter;
}>();

const filteredData = computed(() => {
  // If no filter or empty filter object → return all data
  if (!props.filter || Object.keys(props.filter).length === 0) {
    return data;
  }

  return data.filter((exp: any) => {
    const matchesTags =
      !props.filter?.tags ||
      props.filter.tags.length === 0 ||
      props.filter.tags.some((tag) => exp.tags?.includes(tag));

    const matchesAgeGroup =
      !props.filter?.ageGroup || exp.ageGroup === props.filter.ageGroup;

    return matchesTags && matchesAgeGroup;
  });
});
</script>
<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 mb-20">
    <ExperienceCard v-for="exp in filteredData" :key="exp.id" :exp="exp" />
  </div>
</template>
