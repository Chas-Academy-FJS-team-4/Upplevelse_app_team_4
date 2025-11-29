<script setup>
import data from "../../utils/experiences.json";
import Card from "../experiencePage/ExperienceCard.vue";
</script>
<template>
    <div>
        <Card
            v-for="experience in data.spaceAdventures"
            :key="experience.id"
            :activity="experience"
        />
    </div>
</template>
