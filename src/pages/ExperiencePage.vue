<template>
    <div class="">
        <img class="h-120 w-full object-cover" :src="heroImg" />
        <div class="absolute h-120 inset-0 flex justify-center items-center">
            <Header class="self-start" />
            <SearchBar />
        </div>
    </div>
    <div class="px-24 mt-12 mb-12">
        <h1 class="text-3xl mb-7 font-extrabold">Våra Aktiviteter</h1>
        <Gallery />
    </div>
</template>

<script setup lang="ts">
import heroImg from "../assets/images/hero.jpg";
import SearchBar from "../components/SearchBox.vue";
import Header from "../components/Header.vue";
import Gallery from "../components/experiencePage/ExperienceGallery.vue";
</script>
